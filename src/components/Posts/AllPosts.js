import React, { Component } from 'react';
import ServerError from '../../containers/ServerError';
import RenderAllPosts from '../../containers/Posts/RenderAllPosts';
class AllPosts extends Component {
  state = {
    searchTerm: '',
  };

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

export default AllPosts;
