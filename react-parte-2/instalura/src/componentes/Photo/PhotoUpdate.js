import React, { useState } from 'react';
import { store } from '../../security/TokenStore';

export default ({ id, likeada }) => {
  const [liked, setLiked] = useState(likeada);
  const classLike = liked ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like';

  const doLike = event => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'X-AUTH-TOKEN': store.getValue()
      }
    };

    fetch(`http://localhost:8080/api/fotos/${id}/like`, options)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error('Não foi possível curtir a foto');
        }
      })
      .then(_ => setLiked(!liked))
      .catch(err => alert(err.message));
  }

  return (
    <section className="fotoAtualizacoes">
      <a onClick={doLike} className={classLike} href="#like">Likar</a>
      <form className="fotoAtualizacoes-form">
        <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
        <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
      </form>
    </section>
  );
};
