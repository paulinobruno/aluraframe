import React, { useEffect, useState } from 'react';
import PhotoOps from './PhotoOps';
import PhotoHeader from './PhotoHeader';
import PhotoInfo from './PhotoInfo';
import PhotoUpdate from './PhotoUpdate';

export default ({ data }) => {
  const [photo, setPhoto] = useState(data);
  const ops = new PhotoOps(photo);

  useEffect(() => {
    const subscriberId = ops.subscribeToUpdates(photo.id, setPhoto);

    return () => ops.unsubscribeFromUpdates(subscriberId);
  }, [photo.id, ops, setPhoto]);

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
