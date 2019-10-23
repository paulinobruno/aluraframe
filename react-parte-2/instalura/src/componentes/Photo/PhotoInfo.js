import React, { useEffect, useState } from 'react';
import UserLink from '../UserLink';
import PubSub from 'pubsub-js';

export default ({ id, loginUsuario, comentario, likers: initLikers, comentarios }) => {
  const [likers, setLikers] = useState(initLikers || []);
  const [comments, setComments] = useState(comentarios || []);

  useEffect(() => {
    const subTokenLiked = PubSub.subscribe('photo.liked', (_, { photoId, liker: newLiker }) => {
      if (photoId === id) {
        const withoutCurrent = likers.filter(({ login }) => login !== newLiker.login);

        if (withoutCurrent.length === likers.length) {
          setLikers([...likers, newLiker]);
        } else {
          setLikers(withoutCurrent);
        }
      }
    });

    const subTokenCommented = PubSub.subscribe('photo.commented', (_, { photoId, newComment }) => {
      if (photoId === id) {
        setComments([...comments, newComment]);
      }
    });

    return () => [subTokenLiked, subTokenCommented].forEach(PubSub.unsubscribe);
  });

  return (
    <div className="foto-info">
      <div className="foto-info-likes">
        {
          likers.map(({ login }, index) =>
            <UserLinkWrapper login={login} key={`#${id}#${login}`}
              hasNext={index < (likers.length - 1)} />
          )
        }
        {!!likers.length && <span>{likers.length > 1 ? 'curtiram' : 'curtiu'}</span>}
      </div>

      <p className="foto-info-legenda">
        <UserLink toUser={loginUsuario} className="foto-info-autor" />
        {comentario}
      </p>

      <ul className="foto-info-comentarios">
        {
          comments.map(comentario =>
            <li className="comentario" key={`foto_${id}_comentario_${comentario.id}`}>
              <UserLink toUser={comentario.login} className="foto-info-autor" />
              {comentario.texto}
            </li>
          )
        }
      </ul>
    </div>
  );
};

const UserLinkWrapper = ({ login, hasNext }) => {
  return (
    <span>
      <UserLink toUser={login} />
      {hasNext && ','}
      {' '}
    </span>
  );
};
