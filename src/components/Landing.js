import React, { Component } from 'react';
import About from './LandingComponents/About';
import Header from '../containers/Header';

class Landing extends Component {
  render() {
    return (
      <div className="landing--container">
        <Header />
        <About />
      </div>
    );
  }
}

export default Landing;
