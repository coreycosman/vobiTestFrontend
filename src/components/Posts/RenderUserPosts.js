import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/post-actions';
import PropTypes from 'prop-types';
import ServerError from '../../containers/ServerError';
import ToggleUserPostsComments from '../Comments/ToggleUserPostsComments';

class RenderUserPosts extends Component {
  state = {
    updateFormState: false,
    postId: '',
    title: '',
    description: '',
  };

  updatePost(postId, e) {
    e.preventDefault();
    const { title, description } = this.state;
    const formProps = { title, description };
    this.props.updatePost(postId, formProps, () => {
      this.props.fetchUserPosts();
      this.renderAllUserPosts();
      this.renderFilteredUserPosts();
    });
  }

  deletePost(postId, e) {
    e.preventDefault();
    this.props.deletePost(postId, () => {
      this.props.fetchUserPosts();
      this.renderAllUserPosts();
      this.renderFilteredUserPosts();
    });
  }

  renderUpdateForm(postId) {
    if (this.state.updateFormState && this.state.postId === postId) {
      return (
        <form action="patch" onSubmit={this.updatePost.bind(this, postId)}>
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
          <button type="submit">update post</button>
          {this.renderPostErrors()}
        </form>
      );
    }
  }

  userPosts(postId, postTitle, postDescription) {
    return (
      <div className="posts posts--title">
        {postTitle}
        <div className="posts posts--description">{postDescription}</div>
        <ToggleUserPostsComments postId={postId} />
        <button
          onClick={() => this.setState({ updateFormState: true, postId })}
        >
          update post
        </button>
        {this.renderUpdateForm(postId)}
        <form action="delete" onSubmit={this.deletePost.bind(this, postId)}>
          <button type="submit">delete post</button>
        </form>
        <ServerError />
      </div>
    );
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

  renderAllUserPosts() {
    const { searchTerm, userPosts } = this.props;
    if (searchTerm === '') {
      if (userPosts && userPosts.length > 0) {
        return userPosts.map(post => {
          return (
            <div key={post._id}>
              {this.userPosts(post._id, post.title, post.description)}
            </div>
          );
        });
      }
    }
  }

  renderFilteredUserPosts() {
    const { searchTerm, userPosts } = this.props;
    if (searchTerm !== '') {
      // use filter here
      if (userPosts && userPosts.length > 0) {
        const filteredPosts = [];
        userPosts.forEach(post => {
          if (
            post.title.includes(searchTerm) ||
            post.description.includes(searchTerm)
          ) {
            filteredPosts.push(post);
          }
        });
        return filteredPosts.map(post => {
          return (
            <div>{this.userPosts(post._id, post.title, post.description)}</div>
          );
        });
      }
    }
  }

  render() {
    return (
      <div>
        {this.renderAllUserPosts()}
        {this.renderFilteredUserPosts()}
        <ServerError />
      </div>
    );
  }
}

RenderUserPosts.propTypes = {
  fetchAllPosts: PropTypes.func.isRequired,
  fetchUserPosts: PropTypes.func.isRequired,

  userPosts: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

function mapStateToProps({ postState, postErrors }) {
  return {
    allPosts: postState.allPostsList,
    postErrors: postErrors.updatePostErrorsArray,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(RenderUserPosts);
