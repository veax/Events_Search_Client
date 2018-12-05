import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class EventsList extends Component {
  constructor(props){
    super(props);

    this.state = {
      events: [],
      isLoading: true
    }
  }
  componentDidMount(){
    this.setState({
      isLoading: true
    });
    fetch('http://localhost:8080/evenement/tous')
      .then(res => res.json())
      .then(data => this.setState({
        events: data,
        isLoading: false  
      }))
  }
  render() {
    const {events, isLoading} = this.state;

    if (isLoading){
      return (
        <div className="container">
          <div className="progress">
          <div className="indeterminate"></div>
          </div>
          <p>Loading...</p>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="EventsList">
          {events.map((event)=> 
            <div key = {event.id} className="card hoverable event">
              <div className="card-image">
                {/* <img src={event.imageUrl} alt="some text"/> */}
                <img src={event.url_internet_1} alt="some text"/>
                <span className="card-title">{event.nom}</span>
              </div>
              <div className="card-content">{`${event.description.substring(0,150)}... `}</div>
              <Link to={{pathname: '/events/' + event.id, state: {event: event} }} className="waves-effect waves-light btn-small deep-purple accent-2">See more</Link>
              {/* <a className="waves-effect waves-light btn-small deep-purple accent-2">See more</a> */}
            </div>
          )} 
        </div>
      </div>
    );
  }
}

export default EventsList;
