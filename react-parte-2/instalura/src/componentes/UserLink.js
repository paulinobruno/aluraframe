import React from 'react';
import { Link } from 'react-router-dom';

export default ({ toUser, ...otherProps }) => (
  <Link to={`/timeline/${toUser}`} {...otherProps}>
    {toUser}
  </Link>
);
