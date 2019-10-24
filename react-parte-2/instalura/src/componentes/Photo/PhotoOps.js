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
  constructor(photoId) {
    this.photoId = photoId;

    this.likePhoto = this.likePhoto.bind(this);
    this.commentPhoto = this.commentPhoto.bind(this);
  }

  likePhoto() {
    const options = {
      method: 'POST',
      headers: { ...defaultHeaders }
    };

    fetch(`http://localhost:8080/api/fotos/${this.photoId}/like`, options)
      .then(handleResponse('Não foi possível curtir a foto'))
      .then(liker => {
        PubSub.publish('photo.liked', { photoId: this.photoId, liker });
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

    fetch(`http://localhost:8080/api/fotos/${this.photoId}/comment`, options)
      .then(handleResponse('Não foi possível comentar'))
      .then(newComment => {
        PubSub.publish('photo.commented', { photoId: this.photoId, newComment });
        onSuccess && onSuccess();
      })
      .catch(err => alert(err.message));
  }
}
