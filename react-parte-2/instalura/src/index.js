import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import { BrowserRouter, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './css/normalize.min.css';
import './css/timeline.css';
import './css/login.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
  <BrowserRouter history={createBrowserHistory}>
    <Route exact path="/" component={Login} />
    <Route path="/timeline" component={App} />
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
