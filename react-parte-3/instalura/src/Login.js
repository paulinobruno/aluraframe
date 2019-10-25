import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { store } from './security/TokenStore';

export default function Login({ location }) {
  const history = useHistory();
  const [msg, setMsg] = useState((location.state || {}).msg || '');
  const username = useRef();
  const password = useRef();

  function envia(event) {
    event.preventDefault();

    fetch('http://localhost:8080/api/public/login', {
      method: 'POST',
      body: JSON.stringify({
        login: username.current.value,
        senha: password.current.value
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
      .then(token => {
        store.setValue(token);
        history.push('/timeline');
      })
      .catch(err => setMsg(err.message));
  }

  return (
    <div className="login-box">
      <h1 className="header-logo">Instalura</h1>
      {!!msg && <span>{msg}</span>}
      <form onSubmit={envia}>
        <input type="text" ref={username} />
        <input type="password" ref={password} />
        <input type="submit" value="login" />
      </form>
    </div>
  );
}
