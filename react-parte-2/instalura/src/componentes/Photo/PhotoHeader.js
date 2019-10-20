import React from 'react';
import UserLink from '../UserLink';

export default ({ loginUsuario, horario, urlPerfil }) => (
  <header className="foto-header">
    <figure className="foto-usuario">
      <img src={urlPerfil} alt="foto do usuario" />
      <figcaption className="foto-usuario">
        <UserLink toUser={loginUsuario} />
      </figcaption>
    </figure>
    <time className="foto-data">{horario}</time>
  </header>
);
