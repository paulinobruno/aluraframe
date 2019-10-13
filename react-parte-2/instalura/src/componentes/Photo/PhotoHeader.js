import React from 'react';

export default ({ loginUsuario, horario, urlPerfil }) => (
  <header className="foto-header">
    <figure className="foto-usuario">
      <img src={urlPerfil} alt="foto do usuario" />
      <figcaption className="foto-usuario">
        <a href="#photoHeader">{loginUsuario}</a>
      </figcaption>
    </figure>
    <time className="foto-data">{horario}</time>
  </header>
);
