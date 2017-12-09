import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default () => {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Page Not Found</h1>
          <p>Huumm, we're unable to find that page</p>
          <Link className="button button--link" to="/">Back Home</Link>
        </div>
      </div>
    );
};
