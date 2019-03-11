import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as postActions from '../../actions/post-actions';
import * as commentActions from '../../actions/comment-actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ServerError from '../ServerError';
import CreateComment from '../Comments/CreateComment';
import Header from '../Header';
const joinActions = { ...postActions, ...commentActions };

class Post extends Component {
  state = { showComments: false, postId: '' };

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.fetchPost({ postId });
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
              <div>
                <div>{comment.userName} wrote:</div>
                <div>{comment.text}</div>
              </div>
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

  renderPost() {
    const { post } = this.props;
    if (post) {
      const postId = post._id;
      return (
        <div className="posts posts--title">
          {post.title}
          <div className="posts posts--description">
            {post.description}
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
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderPost()}
        <ServerError />
      </div>
    );
  }
}

Post.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  fetchAllComments: PropTypes.func.isRequired,
  setCommentCount: PropTypes.func.isRequired,

  post: PropTypes.object.isRequired,
  postCommentsCount: PropTypes.number.isRequired,
};

function mapStateToProps({ postState, commentState }) {
  return {
    post: postState.post,
    allComments: commentState.allComments,
    postCommentsCount: commentState.postCommentsCount,
  };
}

export default connect(
  mapStateToProps,
  joinActions,
)(withRouter(Post));
