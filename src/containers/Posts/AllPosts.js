import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as postActions from '../../actions/post-actions';
import * as commentActions from '../../actions/comment-actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ServerError from '../ServerError';
import CreateComment from '../Comments/CreateComment';
import { Link } from 'react-router-dom';
import RenderAllPosts from './RenderAllPosts';
const actions = { ...postActions, ...commentActions };

class AllPosts extends Component {
  state = {
    showComments: false,
    postId: '',
    postCommentsState: [],
    searchTerm: '',
  };

  // componentDidMount() {
  //   this.props.fetchAllPosts();
  //   this.props.fetchAllComments();
  // }

  // togglePostComments(postId) {
  //   const { allComments } = this.props;
  //   if (this.state.showComments && this.state.postId === postId) {
  //     if (allComments && allComments.length > 0) {
  //       let postComments = [];
  //       allComments.forEach(comment => {
  //         if (comment.postId === postId) {
  //           postComments.push(comment);
  //         }
  //       });
  //       this.props.setCommentCount(postComments.length);
  //       return postComments.map(comment => {
  //         return (
  //           <div className="comment" key={comment._id}>
  //             <div>{comment.userName} wrote:</div>
  //             <div>{comment.text}</div>
  //           </div>
  //         );
  //       });
  //     }
  //   } else if (!this.state.showComments && this.state.postId === postId) {
  //     return <div />;
  //   }
  // }

  // renderCommentCount(postId) {
  //   if (this.state.showComments && this.state.postId === postId) {
  //     if (this.props.postCommentsCount > 0) {
  //       return (
  //         <div>this post has {this.props.postCommentsCount} comment(s):</div>
  //       );
  //     } else {
  //       return <div />;
  //     }
  //   } else if (!this.state.showComments && this.state.postId === postId) {
  //     return <div />;
  //   }
  // }

  // renderAllPosts() {
  //   if (this.state.searchTerm === '') {
  //     const { allPosts } = this.props;
  //     if (allPosts && allPosts.length > 0) {
  //       return allPosts.map(post => {
  //         const postId = post._id;
  //         return (
  //           <div key={postId} className="posts posts--title">
  //             {post.title}
  //             <div className="posts posts--description">{post.description}</div>
  //             <Link to={`/posts/${postId}`}>view this post</Link>
  //             <CreateComment postId={postId} />
  //             {this.renderCommentCount(postId)}
  //             {this.togglePostComments(postId)}
  //             <button
  //               onClick={() => {
  //                 this.setState({
  //                   showComments: true,
  //                   postId,
  //                 });
  //               }}
  //             >
  //               show comments
  //             </button>
  //             <button
  //               onClick={() => {
  //                 this.setState({
  //                   showComments: false,
  //                   postId,
  //                 });
  //               }}
  //             >
  //               hide comments
  //             </button>
  //           </div>
  //         );
  //       });
  //     }
  //   }
  // }

  // renderFilteredPosts() {
  //   if (this.state.searchTerm !== '') {
  //     const { allPosts } = this.props;
  //
  //     if (allPosts && allPosts.length > 0) {
  //       const filteredPosts = [];
  //       allPosts.forEach(post => {
  //         if (
  //           post.title.includes(this.state.searchTerm) ||
  //           post.description.includes(this.state.searchTerm)
  //         ) {
  //           filteredPosts.push(post);
  //         }
  //       });
  //       return filteredPosts.map(post => {
  //         const postId = post._id;
  //         return (
  //           <div key={postId} className="posts posts--title">
  //             {post.title}
  //             <div className="posts posts--description">{post.description}</div>
  //             <Link to={`/posts/${postId}`}>view this post</Link>
  //             <CreateComment postId={postId} />
  //             {this.renderCommentCount(postId)}
  //             {this.togglePostComments(postId)}
  //             <button
  //               onClick={() => {
  //                 this.setState({
  //                   showComments: true,
  //                   postId,
  //                 });
  //               }}
  //             >
  //               show comments
  //             </button>
  //             <button
  //               onClick={() => {
  //                 this.setState({
  //                   showComments: false,
  //                   postId,
  //                 });
  //               }}
  //             >
  //               hide comments
  //             </button>
  //           </div>
  //         );
  //       });
  //     }
  //   }
  // }

  render() {
    return (
      <div>
        <div className="posts posts--header">POSTS</div>
        <div className="search">
          <input
            className="search"
            value={this.state.searchTerm}
            type="text"
            onChange={e => this.setState({ searchTerm: e.target.value })}
            placeholder="search posts"
          />
        </div>
        <RenderAllPosts searchTerm={this.state.searchTerm} />
        <ServerError />
      </div>
    );
  }
}
// allPosts={this.props.allPosts}
// searchTerm={this.state.searchTerm}
// allComments={this.props.allComments}
// setCommentCount={this.props.setCommentCount}
// {this.renderFilteredPosts()}
// {this.renderAllPosts()}

// AllPosts.propTypes = {
//   fetchAllPosts: PropTypes.func.isRequired,
//   fetchAllComments: PropTypes.func.isRequired,
//   setCommentCount: PropTypes.func.isRequired,
//
//   allPosts: PropTypes.array.isRequired,
//   allComments: PropTypes.array.isRequired,
//   postCommentsCount: PropTypes.number.isRequired,
// };

function mapStateToProps({ postState, commentState }) {
  return {
    // allPosts: postState.allPostsList,
    // allComments: commentState.allComments,
    // postCommentsCount: commentState.postCommentsCount,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(withRouter(AllPosts));
