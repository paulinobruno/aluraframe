import React, { useState, useRef } from 'react';
import { store } from '../../security/TokenStore';
import PubSub from 'pubsub-js';

const defaultHeaders = { 'X-AUTH-TOKEN': store.getValue() };
const handleResponse = nonOkMessage =>
  resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(nonOkMessage);
    }
  };

export default ({ id, likeada: initLiked }) => {
  const comment = useRef();
  const [liked, setLiked] = useState(initLiked);
  const classLike = liked ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like';

  const doLike = event => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: { ...defaultHeaders }
    };

    fetch(`http://localhost:8080/api/fotos/${id}/like`, options)
      .then(handleResponse('Não foi possível curtir a foto'))
      .then(liker => {
        setLiked(!liked);

        PubSub.publish('photo.liked', { photoId: id, liker });
      })
      .catch(err => alert(err.message));
  };

  const doComment = event => {
    event.preventDefault();

    const options = {
      method: 'POST',
      body: JSON.stringify({
        texto: comment.current.value
      }),
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders
      }
    };

    fetch(`http://localhost:8080/api/fotos/${id}/comment`, options)
      .then(handleResponse('Não foi possível comentar'))
      .then(newComment => {
        PubSub.publish('photo.commented', { photoId: id, newComment });
        comment.current.value = '';
      })
      .catch(err => alert(err.message));
  };

  return (
    <section className="fotoAtualizacoes">
      <a onClick={doLike} className={classLike} href="#like">Likar</a>
      <form className="fotoAtualizacoes-form" onSubmit={doComment}>
        <input type="text" ref={comment}
          placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
        <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
      </form>
    </section>
  );
};
