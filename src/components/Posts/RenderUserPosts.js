import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/post-actions';
import PropTypes from 'prop-types';
import ServerError from '../../containers/ServerError';
import ToggleUserPostsComments from '../Comments/ToggleUserPostsComments';

class RenderUserPosts extends Component {
  state = {
    deletePostState: false,
    postId: '',
  };

  deletePost(postId) {
    if (this.state.deletePostState && this.state.postId === postId) {
      this.props.deletePost(postId, () => {
        this.props.fetchUserPosts();
        this.renderUserPosts();
      });
    }
  }

  renderUserPosts() {
    const { searchTerm, userPosts } = this.props;
    if (searchTerm === '') {
      if (userPosts && userPosts.length > 0) {
        return userPosts.map(post => {
          return (
            <div key={post._id} className="posts posts--title">
              {post.title}
              <div className="posts posts--description">{post.description}</div>
              <ToggleUserPostsComments postId={post._id} />
              <ServerError />
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
            <div key={post._id} className="posts posts--title">
              {post.title}
              <div className="posts posts--description">{post.description}</div>
              <ToggleUserPostsComments postId={post._id} />
              <ServerError />
            </div>
          );
        });
      }
    }
  }

  render() {
    return (
      <div>
        {this.renderUserPosts()}
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

function mapStateToProps({ postState }) {
  return {
    allPosts: postState.allPostsList,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(RenderUserPosts);
