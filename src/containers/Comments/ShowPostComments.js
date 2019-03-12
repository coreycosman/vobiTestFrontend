import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as postActions from '../../actions/post-actions';
import * as commentActions from '../../actions/comment-actions';
import PropTypes from 'prop-types';
import ServerError from '../ServerError';
const actions = { ...postActions, ...commentActions };

class ShowPostComments extends Component {
  componentDidMount() {
    this.props.fetchAllComments();
  }

  togglePostComments() {
    // debugger;
    const { postId } = this.props;
    const { allComments } = this.props;
    if (this.props.showComments && this.props.postIdState === postId) {
      if (allComments && allComments.length > 0) {
        // filter here
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
    } else if (!this.props.showComments && this.props.postIdState === postId) {
      return <div />;
    }
  }

  render() {
    return (
      <div>
        {this.togglePostComments()}
        <ServerError />
      </div>
    );
  }
}

ShowPostComments.propTypes = {
  fetchAllComments: PropTypes.func.isRequired,
  setCommentCount: PropTypes.func.isRequired,

  allComments: PropTypes.array.isRequired,
};

function mapStateToProps({ postState, commentState }) {
  return {
    allComments: commentState.allComments,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(ShowPostComments);
