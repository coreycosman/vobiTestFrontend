import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/post-actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ServerError from '../ServerError';

class CreatePost extends Component {
  state = { title: '', description: '' };

  callCreatePost(e) {
    e.preventDefault();
    const { title, description } = this.state;
    const formData = { title, description };
    this.props.createPost(formData, () => {
      this.props.resetPostErrorsState();
      this.setState({ title: '', description: '' });
      this.props.fetchAllPosts();
      this.props.fetchUserPosts();
    });
  }

  createPostNotifier() {
    if (this.props.postCreated) {
      setTimeout(() => {
        this.props.resetCreatePostState();
      }, 2000);
      return <div className="notifiers">post created</div>;
    }
  }

  renderPostErrors() {
    const { postErrors } = this.props;
    if (postErrors && postErrors.length > 0) {
      setTimeout(() => {
        this.props.resetPostErrorsState();
      }, 10000);
      return postErrors.map(errObject => {
        return (
          <div className="notifiers--errors" key={errObject.id}>
            {errObject.errMessage}
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        Create Post
        <form action="post" onSubmit={this.callCreatePost.bind(this)}>
          <input
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="title"
            type="text"
            name="title"
          />

          <input
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
            placeholder="description"
            type="text"
            name="description"
          />
          <button type="submit">submit</button>
        </form>
        {this.createPostNotifier()}
        {this.renderPostErrors()}
        <ServerError />
      </div>
    );
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  resetCreatePostState: PropTypes.func.isRequired,
  resetPostErrorsState: PropTypes.func.isRequired,

  postCreated: PropTypes.bool.isRequired,
  postErrors: PropTypes.array.isRequired,
};

function mapStateToProps({ postState, postErrors }) {
  return {
    postCreated: postState.created,
    postErrors: postErrors.postErrorsArray,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(withRouter(CreatePost));
