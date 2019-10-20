import React from 'react';
import { store } from './TokenStore';

export const checkAuth = TargetComponent =>
  ({ history, match }) => {
    const { params } = match;

    if (!params.user && !store.isDefined()) {
      history.push({
        pathname: '/',
        state: {
          msg: 'Você precisa estar logado'
        }
      });
    } else {
      return <TargetComponent params={{ ...params }} />;
    }
  };

export const performLogout = ({ history }) => {
  store.dropValue();
  history.push({
    pathname: '/',
    state: {
      msg: 'Você foi deslogado'
    }
  });
};
