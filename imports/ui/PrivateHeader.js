import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

const PrivateHeader = (props) => {
  const onLogout = () => {
    Accounts.logout();
  }
  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={onLogout.bind(this)}>Logout</button>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;