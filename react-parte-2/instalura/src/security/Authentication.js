import React from 'react';
import { store } from './TokenStore';

export const checkAuth = TargetComponent =>
  ({ history, match }) => {
    const accessToUserPublicTimeline = !!match.params.user;
    if (!accessToUserPublicTimeline && !store.isDefined()) {
      history.push({
        pathname: '/',
        state: {
          msg: 'Você precisa estar logado'
        }
      });
    } else {
      return <TargetComponent />;
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
