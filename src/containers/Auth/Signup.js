import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth-actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    confirmation: '',
    firstName: '',
    lastName: '',
  };

  callSignup(e) {
    e.preventDefault();
    const { email, password, confirmation, firstName, lastName } = this.state;
    const formData = { email, password, confirmation, firstName, lastName };
    this.props.signup(formData, () => {
      this.props.history.push('/dashboard');
    });
  }

  renderErrors() {
    const { errors } = this.props;
    if (errors && errors.length > 0) {
      return errors.map(errObject => {
        return <div key={errObject.id}>{errObject.errMessage}</div>;
      });
    }
  }

  render() {
    return (
      <div>
        Signup
        <form action="post" onSubmit={this.callSignup.bind(this)}>
          <input
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="email"
            type="text"
            name="email"
          />
          <input
            onChange={e => this.setState({ firstName: e.target.value })}
            placeholder="first name"
            type="text"
            name="firstName"
          />
          <input
            onChange={e => this.setState({ lastName: e.target.value })}
            placeholder="last name"
            type="text"
            name="lastName"
          />

          <input
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="password"
            type="text"
            name="password"
          />
          <input
            onChange={e => this.setState({ confirmation: e.target.value })}
            placeholder="confirmation"
            type="text"
            name="confirmation"
          />
          <button type="submit">submit</button>
        </form>
        {this.renderErrors()}
      </div>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
};

function mapStateToProps({ auth, authErrors }) {
  return {
    auth: auth.loggedIn,
    errors: authErrors.authErrorsArray,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(withRouter(Signup));
