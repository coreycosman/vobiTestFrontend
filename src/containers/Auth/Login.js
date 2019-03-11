import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth-actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  state = { email: '', password: '' };

  callLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const formData = { email, password };
    this.props.login(formData, () => {
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
        Login
        <form action="post" onSubmit={this.callLogin.bind(this)}>
          <input
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="email"
            type="text"
            name="email"
          />

          <input
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="password"
            type="text"
            name="password"
          />

          <button type="submit">submit</button>
        </form>
        {this.renderErrors()}
      </div>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
};

function mapStateToProps({ auth, authErrors }) {
  return {
    auth: auth.loggedIn,
    errors: authErrors.loginErrorsArray,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(withRouter(Login));
