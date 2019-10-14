import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      msg: ''
    };
  }

  envia(event) {
    event.preventDefault();

    fetch('http://localhost:8080/api/public/login', {
      method: 'POST',
      body: JSON.stringify({
        login: this.username.value,
        senha: this.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => {
        if (resp.ok) {
          return resp.text();
        } else {
          throw new Error('Não foi possível autenticar')
        }
      })
      .then(token => console.log(token))
      .catch(err => this.setState({ msg: err.message }));
  }

  render() {
    return (
      <div className="login-box">
        <h1 className="header-logo">Instalura</h1>
        {!!this.state.msg && <span>{this.state.msg}</span>}
        <form onSubmit={this.envia.bind(this)}>
          <input type="text" ref={input => this.username = input}/>
          <input type="password" ref={input => this.password = input}/>
          <input type="submit" value="login" />
        </form>
      </div>
    );
  }
}
