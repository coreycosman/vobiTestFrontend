import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/server-error-action';
import PropTypes from 'prop-types';

class ServerError extends Component {
  renderServerError() {
    const { serverError } = this.props;
    if (!serverError === '') {
      setTimeout(() => {
        this.props.resetServerErrorState();
      }, 10000);
      return <div className="notifiers">{serverError}</div>;
    }
  }

  render() {
    return <div>{this.renderServerError()}</div>;
  }
}

ServerError.propTypes = {
  resetServerErrorState: PropTypes.func.isRequired,

  serverError: PropTypes.string.isRequired,
};

function mapStateToProps({ serverError }) {
  return {
    serverError: serverError.serverErrMessage,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(ServerError);
