import PubSub from 'pubsub-js';
import { store } from '../../security/TokenStore';

const defaultHeaders = { 'X-AUTH-TOKEN': store.getValue() };
const handleResponse = nonOkMessage =>
  resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(nonOkMessage);
    }
  };

export default class PhotoOps {
  constructor(photo) {
    this.photo = photo;

    this.likePhoto = this.likePhoto.bind(this);
    this.commentPhoto = this.commentPhoto.bind(this);
  }

  likePhoto() {
    const options = {
      method: 'POST',
      headers: { ...defaultHeaders }
    };

    fetch(`http://localhost:8080/api/fotos/${this.photo.id}/like`, options)
      .then(handleResponse('Não foi possível curtir a foto'))
      .then(newLiker => {
        const withoutCurrent = this.photo.likers.filter(({ login }) => login !== newLiker.login);

        if (withoutCurrent.length === this.photo.likers.length) {
          this.photo.likers = [...this.photo.likers, newLiker];
        } else {
          this.photo.likers = withoutCurrent;
        }

        this.photo.likeada = !this.photo.likeada;
        PubSub.publish('photo.updated', this.photo);
      })
      .catch(err => alert(err.message));
  }

  commentPhoto(texto, onSuccess) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ texto }),
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders
      }
    };

    fetch(`http://localhost:8080/api/fotos/${this.photo.id}/comment`, options)
      .then(handleResponse('Não foi possível comentar'))
      .then(newComment => {
        this.photo.comentarios = [...this.photo.comentarios, newComment];
        PubSub.publish('photo.updated', this.photo);

        onSuccess && onSuccess();
      })
      .catch(err => alert(err.message));
  }

  subscribeToUpdates(photoId, callback) {
    return PubSub.subscribe('photo.updated', (_, updatedPhoto) => {
      if (photoId === updatedPhoto.id) {
        callback(updatedPhoto);
      }
    });
  }

  unsubscribeFromUpdates(subscriberId) {
    PubSub.unsubscribe(subscriberId);
  }
}
