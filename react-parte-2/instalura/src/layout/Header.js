import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

export default () => {
  const txtQuery = useRef();

  const doSearch = event => {
    event.preventDefault();

    const queryText = txtQuery.current.value.trim();
    if (queryText !== '') {
      fetch(`http://localhost:8080/api/public/fotos/${queryText}`)
        .then(response => response.json())
        .then(searchedPhotos => PubSub.publish('timeline.search.found', searchedPhotos));
    } else {
      PubSub.publish('timeline.search.not-found');
    }
  };

  return (
    <header className="header container">
      <h1 className="header-logo">Instalura</h1>

      <form className="header-busca" onSubmit={doSearch}>
        <input type="text" ref={txtQuery} name="search" placeholder="Pesquisa" className="header-busca-campo" />
        <input type="submit" value="Buscar" className="header-busca-submit" />
      </form>

      <nav>
        <ul className="header-nav">
          <li className="header-nav-item">
            <a href="#header">♡</a>
            <Link to="/logout">⎋</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
