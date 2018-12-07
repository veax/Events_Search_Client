import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class EventsList extends Component {
  state = {
    events: [],
    isLoading: true
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


    // let exctractedTypes = (events) => {
    //   let extractEventsTypes = new Set();
    //   let extractEventsDates = new Set();
    //   events.forEach((event) => {
    //     extractEventsTypes.add(event.type)
    //     extractEventsDates.add(event.lieu)
    //   })
    //   console.log(extractEventsTypes)
    // this.props.onLoad(extractEventsTypes)
    // }
  }



  render() {
    const { events, isLoading } = this.state;
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
    

    let filteredEvents = events.filter(
      (event) => {
        return event.nom.toLowerCase().indexOf(this.props.textFilter.toLowerCase()) !== -1;
      }
    )

    const eventsList = filteredEvents.map(event => {
      return (
        <div key={event.recordid} className="card hoverable event">
          <div className="card-image">
            <div className="event-img"style={{backgroundImage:`url(${event.media_1})`}}></div>
            <span className="card-title">{event.nom}</span>
          </div>
          <div className="card-content">{`${event.description.substring(0,150)}... `}</div>
          <Link to={{pathname: '/events/' + event.recordid, state: {event: event} }} className="waves-effect waves-light btn-small deep-purple accent-2">See more</Link>
        </div>
      )
    })

    return (
      <div className="container">
        <div className="EventsList">
          { eventsList }
        </div>
      </div>
    );
  }
}

export default EventsList;
