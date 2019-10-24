import React, { useRef } from 'react';

export default ({ likeada, handleLike, handleComment }) => {
  const comment = useRef();
  const classLike = likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like';

  const doLike = event => {
    event.preventDefault();
    handleLike();
  };

  const doComment = event => {
    event.preventDefault();
    handleComment(comment.current.value, () => comment.current.value = '');
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
