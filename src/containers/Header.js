import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import CreatePost from './Posts/CreatePost';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  renderLoggedInLandingHeader() {
    if (this.props.auth.loggedIn && window.location.pathname === '/') {
      return (
        <div>
          <Logout />
          <Link className="header--landing" to="/userposts">
            View My Posts
          </Link>
          <Link to="/dashboard"> View All Posts</Link>
        </div>
      );
    }
  }

  renderDashboardHeader() {
    if (this.props.auth.loggedIn && window.location.pathname === '/dashboard') {
      return (
        <div>
          <CreatePost />
          <Logout />
          <Link to="/userposts">View My Posts</Link>
        </div>
      );
    }
  }

  renderUserPostsHeader() {
    if (this.props.auth.loggedIn && window.location.pathname === '/userposts') {
      return (
        <div>
          <CreatePost />
          <Logout />
          <Link to="/dashboard">View All Posts</Link>
        </div>
      );
    }
  }

  renderPostHeader() {
    if (this.props.auth.loggedIn && this.props.match.path === '/posts/:id') {
      return (
        <div>
          <Logout />
          <Link className="header--post" to="/dashboard">
            View All Posts
          </Link>
          <Link to="/userposts">View My Posts</Link>
        </div>
      );
    }
  }

  renderLoggedOutHeader() {
    if (!this.props.auth.loggedIn) {
      return (
        <div>
          <Signup />
          <Login />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="header">
        {this.renderLoggedInLandingHeader()}
        {this.renderLoggedOutHeader()}
        {this.renderDashboardHeader()}
        {this.renderUserPostsHeader()}
        {this.renderPostHeader()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(withRouter(Header));
