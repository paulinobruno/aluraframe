import React from 'react';
import UserLink from '../UserLink';

export default ({ id, loginUsuario, comentario, likers, comentarios }) => (
  <div className="foto-info">
    <div className="foto-info-likes">
      {
        likers.map(liker =>
          <UserLink toUser={liker.login} key={`#${id}#${liker.login}`} />
        )
      }
      <span>{likers.length > 1 ? 'curtiram' : 'curtiu'}</span>
    </div>

    <p className="foto-info-legenda">
      <UserLink toUser={loginUsuario} className="foto-info-autor" />
      {comentario}
    </p>

    <ul className="foto-info-comentarios">
      {
        comentarios.map(comentario =>
          <li className="comentario" key={`foto_${id}_comentario_${comentario.id}`}>
            <UserLink toUser={comentario.login} className="foto-info-autor" />
            {comentario.texto}
          </li>
        )
      }
    </ul>
  </div>
);
