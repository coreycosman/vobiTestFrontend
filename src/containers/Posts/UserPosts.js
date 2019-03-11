import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as postActions from '../../actions/post-actions';
import * as commentActions from '../../actions/comment-actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import requireAuth from '../../components/HigherOrderComponents/requireAuth';
import Header from '../Header';
import CreateComment from '../Comments/CreateComment';
import ServerError from '../ServerError';
import { Link } from 'react-router-dom';

const joinActions = { ...postActions, ...commentActions };

class UserPosts extends Component {
  state = { showCommentForm: false, showComments: false, postId: '' };

  componentDidMount() {
    this.props.fetchUserPosts();
    this.props.fetchAllComments();
  }

  togglePostComments(postId) {
    const { allComments } = this.props;
    if (this.state.showComments && this.state.postId === postId) {
      if (allComments && allComments.length > 0) {
        let postComments = [];
        allComments.forEach(comment => {
          if (comment.postId === postId) {
            postComments.push(comment);
          }
        });
        this.props.setCommentCount(postComments.length);
        return postComments.map(comment => {
          return (
            <div className="comment" key={comment._id}>
              <div>{comment.userName} wrote:</div>
              <div>{comment.text}</div>
            </div>
          );
        });
      }
    } else if (!this.state.showComments && this.state.postId === postId) {
      return <div />;
    }
  }

  renderCommentCount(postId) {
    if (this.state.showComments && this.state.postId === postId) {
      if (this.props.postCommentsCount > 0) {
        return (
          <div>this post has {this.props.postCommentsCount} comment(s):</div>
        );
      } else {
        return <div />;
      }
    } else if (!this.state.showComments && this.state.postId === postId) {
      return <div />;
    }
  }

  renderUserPosts() {
    const { userPosts } = this.props;
    if (userPosts && userPosts.length > 0) {
      return userPosts.map(post => {
        const postId = post._id;
        return (
          <div key={postId} className="posts posts--title">
            {post.title}
            <div className="posts posts--description">{post.description}</div>
            <Link to={`/posts/${postId}`}>view this post</Link>
            <CreateComment postId={postId} />
            {this.renderCommentCount(postId)}
            {this.togglePostComments(postId)}
            <button
              onClick={() => {
                this.setState({
                  showComments: true,
                  postId,
                });
              }}
            >
              show comments
            </button>
            <button
              onClick={() => {
                this.setState({
                  showComments: false,
                  postId,
                });
              }}
            >
              hide comments
            </button>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="posts posts--header">{this.props.userName}'s Posts</div>
        {this.renderUserPosts()}
        <ServerError />
      </div>
    );
  }
}

UserPosts.propTypes = {
  fetchUserPosts: PropTypes.func.isRequired,
  fetchAllComments: PropTypes.func.isRequired,
  setCommentCount: PropTypes.func.isRequired,

  userName: PropTypes.string.isRequired,
  userPosts: PropTypes.array.isRequired,
  postCommentsCount: PropTypes.number.isRequired,
};

function mapStateToProps({ postState, commentState }) {
  return {
    userName: postState.userData.userName,
    userPosts: postState.userData.userPostsList,
    allComments: commentState.allComments,
    postCommentsCount: commentState.postCommentsCount,
  };
}

export default connect(
  mapStateToProps,
  joinActions,
)(withRouter(requireAuth(UserPosts)));
