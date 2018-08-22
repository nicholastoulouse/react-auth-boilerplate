import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
const SurveyNew = () => <h3>SurveyNew</h3>;


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
            <Route exact path='/' component={Landing}/>
            <Route exact path='/surveys' component={Dashboard}/>
            <Route path='/surveys/new' component={SurveyNew}/>
          </div>
        </Router>
      </div>
    );
  }
}

// 1st arg is mapStateToProps which we dont need here
// 2nd args is all the action creators we want to wire up
export default connect(null, actions)(App);