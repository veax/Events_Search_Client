import React, { Component } from 'react';

import Navbar from './Navbar';
import HomePage from './HomePage';
import loginPage from './loginPage';
import SignUpPage from './SignUpPage';
import EventPage from './EventPage';

import 'materialize-css/dist/css/materialize.min.css';
import './styles/app.sass';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={loginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route path="/events/:event_id" component={EventPage} />
        </div>
      </Router>
    );
  }
}

export default App;
