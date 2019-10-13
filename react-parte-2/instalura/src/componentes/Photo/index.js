import React from 'react';
import PhotoHeader from './PhotoHeader';
import PhotoInfo from './PhotoInfo';
import PhotoUpdate from './PhotoUpdate';

export default ({ data }) => (
  <div className="foto">
    <PhotoHeader {...data} />
    <img alt="foto" className="foto-src" src={data.urlFoto} />
    <PhotoInfo {...data} />
    <PhotoUpdate />
  </div>
);
