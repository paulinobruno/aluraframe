import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Input from './components/Input';
import Button from './components/Button';
import TratadorErros from './TratadorErros';

const _handleHttpErrors = res => {
  if (!res.ok) {
    return res.json().then(body => {
      const err = new Error(res.statusText);
      err.status = res.status;
      err.body = body;
      err.rawResponse = res;
      throw err;
    });
  }

  return res;
}

class Lista extends Component {
  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {this.props.lista.map(item =>
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.email}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

class Formulario extends Component {
  constructor() {
    super();

    this.state = {
      nome: '',
      email: '',
      senha: ''
    };

    this.enviaForm = this.enviaForm.bind(this);
    this.setValue = this.setValue.bind(this);
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
      .then(lista => PubSub.publish('atualiza-lista-autores', lista))
      .catch(err => {
        if (err.status === 400) {
          new TratadorErros().publicaErros(err.body);
        }
      });
  }

  setValue(event) {
    const { id: fieldName, value } = event.target;
    this.setState({ [fieldName]: value });
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
          <Input label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setValue} />
          <Input label="E-mail" id="email" type="email" name="email" value={this.state.email} onChange={this.setValue} />
          <Input label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setValue} />
          <Button label="Gravar" />
        </form>
      </div>
    );
  }
}

export default class AutorBox extends Component {
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

    PubSub.subscribe('atualiza-lista-autores', (topico, lista) => this.setState({ lista }));
  }

  render() {
    return (
      <div>
        <Formulario />
        <Lista lista={this.state.lista}/>
      </div>
    );
  }
}
