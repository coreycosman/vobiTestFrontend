import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/post-actions';
import PropTypes from 'prop-types';
import ServerError from '../../containers/ServerError';
import RenderAllPosts from '../../components/Posts/RenderAllPosts';

class AllPosts extends Component {
  state = {
    searchTerm: '',
  };

  componentDidMount() {
    this.props.fetchAllPosts();
  }

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
        <RenderAllPosts
          allPosts={this.props.allPosts}
          searchTerm={this.state.searchTerm}
        />
        <ServerError />
      </div>
    );
  }
}

AllPosts.propTypes = {
  fetchAllPosts: PropTypes.func.isRequired,

  allPosts: PropTypes.array.isRequired,
};

function mapStateToProps({ postState }) {
  return {
    allPosts: postState.allPostsList,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(AllPosts);
