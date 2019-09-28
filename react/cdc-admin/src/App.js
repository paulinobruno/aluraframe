import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';

const _handleHttpErrors = res => {
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res;
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      lista: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/autores')
      .then(_handleHttpErrors)
      .then(response => response.json())
      .then(lista => this.setState({ lista }));
  }

  enviaForm(event) {
    event.preventDefault();

    fetch('http://localhost:8080/api/autores', {
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify({})
    })
      .then(_handleHttpErrors)
      .then(x => console.log('sucesso', x))
      .catch(x => console.error('erro', x));
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#company">paulinobruno</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#home" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#autor" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#livro" className="pure-menu-link">Livro</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>

          <div className="content" id="content">

            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                <div className="pure-control-group">
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" type="text" name="nome" />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="senha">Senha</label>
                  <input id="senha" type="password" name="senha" />
                </div>
                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>
            </div>

            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lista.map(item =>
                    <tr key={item.id}>
                      <td>{item.nome}</td>
                      <td>{item.email}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
