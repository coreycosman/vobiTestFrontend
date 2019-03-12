import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/comment-actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ServerError from '../ServerError';

class CreateComment extends Component {
  state = { text: '', showCommentForm: false };

  callCreateComment(e) {
    e.preventDefault();
    const { postId } = this.props;
    const { text } = this.state;
    const formData = { text, formPostId: postId };
    this.props.createComment(formData, () => {
      this.props.fetchAllComments();
      this.props.resetCommentErrorsState();
      setTimeout(() => {
        this.setState({ text: '', showCommentForm: false });
      }, 1000);
    });
  }

  createCommentNotifier() {
    if (this.props.commentCreated) {
      setTimeout(() => {
        this.props.resetCreateCommentState();
      }, 1000);
      return <div className="notifiers">comment created</div>;
    }
  }

  renderCommentErrors() {
    const { commentErrors } = this.props;
    if (commentErrors && commentErrors.length > 0) {
      setTimeout(() => {
        this.props.resetCommentErrorsState();
      }, 10000);
      return commentErrors.map(errObject => {
        return (
          <div className="notifiers--errors" key={errObject.id}>
            {errObject.errMessage}
          </div>
        );
      });
    }
  }

  renderCommentForm() {
    if (this.state.showCommentForm) {
      return (
        <div>
          <form action="post" onSubmit={this.callCreateComment.bind(this)}>
            <input
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
              placeholder="comment text"
              type="text"
              name="text"
            />
            <button type="submit">comment</button>
          </form>
          {this.createCommentNotifier()}
          {this.renderCommentErrors()}
          <ServerError />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ showCommentForm: true });
          }}
        >
          comment on this post
        </button>
        {this.renderCommentForm()}
        <ServerError />
      </div>
    );
  }
}

CreateComment.propTypes = {
  createComment: PropTypes.func.isRequired,
  postId: PropTypes.string,
  resetCreateCommentState: PropTypes.func.isRequired,
  resetCommentErrorsState: PropTypes.func.isRequired,

  commentCreated: PropTypes.bool.isRequired,
  commentErrors: PropTypes.array.isRequired,
};

function mapStateToProps({ commentState, commentErrors }) {
  return {
    commentErrors: commentErrors.commentErrorsList,
    commentCreated: commentState.created,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(withRouter(CreateComment));
