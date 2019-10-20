import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import { checkAuth, performLogout } from './security/Authentication';
import { BrowserRouter, Route } from 'react-router-dom';
import './css/normalize.min.css';
import './css/timeline.css';
import './css/login.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/timeline/:user?" render={checkAuth(App)} />
      <Route path="/logout" render={performLogout} />
    </div>
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
