import React, { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import PhotoOps from './PhotoOps';
import PhotoHeader from './PhotoHeader';
import PhotoInfo from './PhotoInfo';
import PhotoUpdate from './PhotoUpdate';

export default ({ data }) => {
  const [photo, setPhoto] = useState(data);
  const ops = new PhotoOps(photo.id);

  useEffect(() => {
    const subs = [
      PubSub.subscribe('photo.liked', (_, { photoId, liker: newLiker }) => {
        if (photo.id === photoId) {
          const withoutCurrent = photo.likers.filter(({ login }) => login !== newLiker.login);

          if (withoutCurrent.length === photo.likers.length) {
            photo.likers = [...photo.likers, newLiker];
          } else {
            photo.likers = withoutCurrent;
          }

          photo.likeada = !photo.likeada;
          setPhoto(photo);
        }
      }),
      PubSub.subscribe('photo.commented', (_, { photoId, newComment }) => {
        if (photo.id === photoId) {
          photo.comentarios = [...photo.comentarios, newComment];
          setPhoto(photo);
        }
      }),
    ];

    return () => subs.forEach(PubSub.unsubscribe);
  });

  return (
    <div className="foto">
      <PhotoHeader {...photo} />
      <img alt="foto" className="foto-src" src={photo.urlFoto} />
      <PhotoInfo {...photo} />
      <PhotoUpdate {...photo}
        handleLike={ops.likePhoto}
        handleComment={ops.commentPhoto} />
    </div>
  );
};
