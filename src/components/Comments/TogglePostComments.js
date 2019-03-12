import React, { Component } from 'react';
import CreateComment from '../../containers/Comments/CreateComment';
import ShowPostComments from '../../containers/Comments/ShowPostComments';
import RenderCommentCount from '../../containers/Comments/RenderCommentCount';
import { Link } from 'react-router-dom';

export default class TogglePostComments extends Component {
  state = {
    showComments: false,
    postId: '',
  };

  render() {
    const { postId } = this.props;
    return (
      <div>
        <Link to={`/posts/${postId}`}>view this post</Link>
        <CreateComment postId={postId} />
        <RenderCommentCount
          postId={postId}
          showComments={this.state.showComments}
          postIdState={this.state.postId}
        />
        <ShowPostComments
          postId={postId}
          showComments={this.state.showComments}
          postIdState={this.state.postId}
        />
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
  }
}
