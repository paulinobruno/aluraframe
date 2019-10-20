import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header container">
      <h1 className="header-logo">Instalura</h1>

      <form className="header-busca">
        <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" />
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
