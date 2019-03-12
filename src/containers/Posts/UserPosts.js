import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/post-actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import requireAuth from '../../components/HigherOrderComponents/requireAuth';
import Header from '../Header';
import ServerError from '../ServerError';
import RenderUserPosts from '../../components/Posts/RenderUserPosts';

class UserPosts extends Component {
  state = {
    searchTerm: '',
  };

  componentDidMount() {
    this.props.fetchUserPosts();
  }

  render() {
    return (
      <div>
        <Header />
        <div className="posts posts--header">{this.props.userName}'s Posts</div>
        <div className="search">
          <input
            className="search"
            value={this.state.searchTerm}
            type="text"
            onChange={e => this.setState({ searchTerm: e.target.value })}
            placeholder="search posts"
          />
        </div>
        <RenderUserPosts
          userPosts={this.props.userPosts}
          searchTerm={this.state.searchTerm}
        />
        <ServerError />
      </div>
    );
  }
}

UserPosts.propTypes = {
  fetchUserPosts: PropTypes.func.isRequired,

  userName: PropTypes.string.isRequired,
  userPosts: PropTypes.array.isRequired,
};

function mapStateToProps({ postState }) {
  return {
    userName: postState.userData.userName,
    userPosts: postState.userData.userPostsList,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(withRouter(requireAuth(UserPosts)));
