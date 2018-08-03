import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const Test = () => <h3>Test</h3>;
const Landing = () => <h4>Landing</h4>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <Header/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/test' component={Test}/>
            <Route exact path='/' component={Landing}/>
          </div>
        </Router>
      </div>
    );
  }
}

// 1st arg is mapStateToProps which we dont need here
// 2nd args is all the action creators we want to wire up
export default connect(null, actions)(App);