// library
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// routes
import Dashboard from './Dashboard';
import Landing from './Landing';
import UserPosts from '../containers/Posts/UserPosts';
import Post from './Posts/Post';
// sass
import '../sass/css-loader.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app--container">
        <BrowserRouter class="app--container">
          <div className="app--container">
            <Route path="/" component={Landing} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/userposts" component={UserPosts} exact />
            <Route path="/posts/:id" component={Post} exact />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
