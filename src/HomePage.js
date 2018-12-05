import React, { Component } from 'react'
import EventsList from './EventsList';
import { Link } from 'react-router-dom';

export class HomePage extends Component {
  render() {
    return (
        <div>
            <div className="container">
                <div className="search-wrapper center">
                    <div className="search-box">
                    <input type="text" placeholder="search for events..." id="search"/>
                    <i className="material-icons">search</i>
                    </div>
                </div>
            </div>
            <EventsList/>
        </div>
    )
  }
}

export default HomePage
