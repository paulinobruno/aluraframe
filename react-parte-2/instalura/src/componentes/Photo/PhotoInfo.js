import React from 'react';

export default ({ id, loginUsuario, comentario, likers, comentarios }) => (
  <div className="foto-info">
    <div className="foto-info-likes">
      {
        likers.map(liker => {
          const hash = `#${id}#${liker.login}`;

          return <a key={hash} href={hash}>{liker.login},</a>;
        })
      }
      <span>{likers.length > 1 ? 'curtiram' : 'curtiu'}</span>
    </div>

    <p className="foto-info-legenda">
      <a className="foto-info-autor" href="#photoInfo#3">{loginUsuario}</a>
      {comentario}
    </p>

    <ul className="foto-info-comentarios">
      {
        comentarios.map(comentario =>
          <li className="comentario" key={`foto_${id}_comentario_${comentario.id}`}>
            <a className="foto-info-autor" href="#photoInfo#4">{comentario.login}</a>
            {comentario.texto}
          </li>
        )
      }
    </ul>
  </div>
);
