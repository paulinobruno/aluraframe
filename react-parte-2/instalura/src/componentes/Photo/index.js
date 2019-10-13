import React from 'react';
import PhotoHeader from './PhotoHeader';
import PhotoInfo from './PhotoInfo';
import PhotoUpdate from './PhotoUpdate';

export default () => (
  <div className="foto">
    <PhotoHeader />
    <img alt="foto" className="foto-src"
      src="https://z-p42-instagram.fcgh4-1.fna.fbcdn.net/vp/63997ccc056a03df31ad86da1c1c0856/5E1D0C47/t51.2885-15/e35/s1080x1080/62836417_339388646729442_3328091899438900259_n.jpg?_nc_ad=z-m&_nc_ht=z-p42-instagram.fcgh4-1.fna.fbcdn.net&_nc_cat=106" />
    <PhotoInfo />
    <PhotoUpdate />
  </div>
);
