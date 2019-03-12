import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as postActions from '../../actions/post-actions';
import * as commentActions from '../../actions/comment-actions';
import PropTypes from 'prop-types';
import ServerError from '../ServerError';
const actions = { ...postActions, ...commentActions };

class RenderCommentCount extends Component {
  componentDidMount() {
    this.props.fetchAllComments();
  }

  renderCommentCount() {
    if (
      this.props.showComments &&
      this.props.postIdState === this.props.postId
    ) {
      if (this.props.postCommentsCount > 0) {
        return (
          <div>this post has {this.props.postCommentsCount} comment(s):</div>
        );
      } else {
        return <div />;
      }
    } else if (
      !this.props.showComments &&
      this.props.postIdState === this.props.postId
    ) {
      return <div />;
    }
  }

  render() {
    return (
      <div>
        {this.renderCommentCount()}
        <ServerError />
      </div>
    );
  }
}

RenderCommentCount.propTypes = {
  postCommentsCount: PropTypes.number.isRequired,
};

function mapStateToProps({ postState, commentState }) {
  return {
    postCommentsCount: commentState.postCommentsCount,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(RenderCommentCount);
