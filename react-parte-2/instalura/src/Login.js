import React, { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [ msg, setMsg ] = useState('');
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
        localStorage.setItem('auth-token', token);
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
