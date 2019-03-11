import React, { Component } from 'react';
import requireAuth from './HigherOrderComponents/requireAuth';
import Header from '../containers/Header';
import AllPosts from '../containers/Posts/AllPosts';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <AllPosts />
      </div>
    );
  }
}

export default requireAuth(Dashboard);
