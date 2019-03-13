import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ServerError from '../../containers/ServerError';
import TogglePostComments from '../Comments/TogglePostComments';
import moment from 'moment';

export default class RenderAllPosts extends Component {
  renderAllPosts() {
    const { searchTerm, allPosts } = this.props;
    if (searchTerm === '') {
      if (allPosts && allPosts.length > 0) {
        return allPosts.map(post => {
          return (
            <div key={post._id} className="posts posts--title">
              <h4>
                {post.userName} posted on{' '}
                {moment(post.createdAt).format('MMM Do, YYYY, h:mm a')}
              </h4>
              {post.title}
              <div className="posts posts--description">{post.description}</div>
              <TogglePostComments postId={post._id} />
              <ServerError />
            </div>
          );
        });
      }
    }
  }
  renderFilteredPosts() {
    const { searchTerm, allPosts } = this.props;
    if (searchTerm !== '') {
      if (allPosts && allPosts.length > 0) {
        const filteredPosts = [];
        allPosts.forEach(post => {
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
              <TogglePostComments postId={post._id} />
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
        {this.renderAllPosts()}
        {this.renderFilteredPosts()}
        <ServerError />
      </div>
    );
  }
}

RenderAllPosts.propTypes = {
  allPosts: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
};
