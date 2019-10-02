import React, { Component } from 'react';
import Input from './components/Input';
import Button from './components/Button';
import Select from './components/Select';

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

export default class LivroBox extends Component {
  constructor() {
    super();

    this.state = {
      autores: [],
      titulo: '',
      preco: 0,
      autorId: '',
    };

    this.enviaForm = this.enviaForm.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  enviaForm(event) {
    event.preventDefault();
  }

  setValue(event) {
    const { id: fieldName, value } = event.target;
    this.setState({ [fieldName]: value });
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/autores')
      .then(_handleHttpErrors)
      .then(response => response.json())
      .then(autores => this.setState({ autores }));
  }

  render() {
    return(
      <div>
        <div className="header">
          <h1>Cadastro de Livros</h1>
        </div>
        <div className="content" id="content">
          <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
              <Input label="Titulo" id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setValue} />
              <Input label="Preço" id="preco" type="number" name="preco" value={this.state.preco} onChange={this.setValue} />
              <Select label="Autor" options={this.state.autores} id="autorId" name="autorId"
                value={this.state.autorId} onChange={this.setValue} />
              <Button label="Gravar" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
