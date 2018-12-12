import React, { Component } from 'react';

import Navbar from './HeaderComponents/Navbar';
import HomePage from './HomePage';
import loginPage from './HeaderComponents/loginPage';
import SignUpPage from './HeaderComponents/SignUpPage';
import EventPage from './EventPage';
import Bookmark_Events from './Bookmark_Events';

import 'materialize-css/dist/css/materialize.min.css';
import './styles/app.sass';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
          <Route path="/user/bookmarks" component={Bookmark_Events} />
        </div>
      </Router>
    );
  }
}

export default App;
