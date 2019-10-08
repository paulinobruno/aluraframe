import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Input from './components/Input';
import Button from './components/Button';
import Select from './components/Select';
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

class Formulario extends Component {
  constructor() {
    super();

    this.state = {
      titulo: '',
      preco: '',
      autorId: '',
    };

    this.enviaForm = this.enviaForm.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  enviaForm(event) {
    event.preventDefault();

    const { titulo, preco, autorId } = this.state;

    fetch('http://localhost:8080/api/livros', {
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify({ titulo, preco, autorId })
    })
      .then(_handleHttpErrors)
      .then(response => response.json())
      .then(lista => PubSub.publish('atualiza-lista-livros', lista))
      .then(() => this.setState({
        titulo: '',
        preco: '',
        autorId: '',
      }))
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
          <Input label="Titulo" id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setValue} />
          <Input label="Preço" id="preco" type="number" name="preco" value={this.state.preco} onChange={this.setValue} />
          <Select label="Autor" options={this.props.autores} id="autorId" name="autorId"
            value={this.state.autorId} onChange={this.setValue} />
          <Button label="Gravar" />
        </form>
      </div>
    );
  }
}

class Lista extends Component {
  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Autor</th>
              <th>Título</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {this.props.lista.map(item =>
              <tr key={item.id}>
                <td>{item.autor.nome}</td>
                <td>{item.titulo}</td>
                <td>{item.preco}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default class LivroBox extends Component {
  constructor() {
    super();

    this.state = {
      autores: [],
      livros: [],
    };
  }

  componentDidMount() {
    const promises = [
      fetch('http://localhost:8080/api/autores'),
      fetch('http://localhost:8080/api/livros')
    ].map(p =>
      p.then(_handleHttpErrors)
        .then(response => response.json())
    );

    Promise.all(promises)
      .then(([autores, livros]) => this.setState({ autores, livros }));

    PubSub.subscribe('atualiza-lista-livros', (topico, livros) => this.setState({ livros }));
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de Livros</h1>
        </div>
        <div className="content" id="content">
          <Formulario autores={this.state.autores} />
          <Lista lista={this.state.livros} />
        </div>
      </div>
    );
  }
}
