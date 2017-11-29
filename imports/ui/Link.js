import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

export default class Link extends React.Component {
  onLogout() {
    Accounts.logout();
  }
  render() {
    return (
      <div>
        <h1>Links</h1>

        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );
  }
}