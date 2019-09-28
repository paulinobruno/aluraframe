import React, { Component } from 'react';
import Input from './components/Input';
import Button from './components/Button';
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
      nome: '',
      email: '',
      senha: ''
    };

    this.enviaForm = this.enviaForm.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/autores')
      .then(_handleHttpErrors)
      .then(response => response.json())
      .then(lista => this.setState({ lista }));
  }

  enviaForm(event) {
    event.preventDefault();

    const { nome, email, senha } = this.state;

    fetch('http://localhost:8080/api/autores', {
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify({ nome, email, senha })
    })
      .then(_handleHttpErrors)
      .then(response => response.json())
      .then(lista => this.setState({ lista }))
      .catch(x => console.error('erro', x));
  }

  setValue(event) {
    const { id: fieldName, value } = event.target;
    this.setState({ [fieldName]: value });
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
                <Input label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setValue} />
                <Input label="E-mail" id="email" type="email" name="email" value={this.state.email} onChange={this.setValue} />
                <Input label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setValue} />
                <Button label="Gravar" />
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
