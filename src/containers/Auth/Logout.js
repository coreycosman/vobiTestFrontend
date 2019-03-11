import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth-actions';
import { Link } from 'react-router-dom';

class Logout extends Component {
  handleLogout() {
    this.props.logout();
  }

  render() {
    return (
      <li className="button">
        <Link onClick={this.handleLogout.bind(this)} to="/">
          Logout
        </Link>
      </li>
    );
  }
}

export default connect(
  null,
  actions,
)(Logout);
