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
    const fetchEvents = async () => {
      const response = await fetch('http://localhost:8080/evenement/tous')
      const data = await response.json()
      this.setState({
        events: data,
        isLoading: false
      })
      exctractEventsData(data) 
    }
    fetchEvents()

    const exctractEventsData = (events) => {
      let eventsTypes = new Set();
      let eventsDates = new Set();
      events.forEach((event) => {
        event.type = event.type.replace(/,*$/,"") // remove ,,, in the end of types
        eventsTypes.add(event.type)
        eventsDates.add(event.date)
      })
      const val = [...eventsTypes]
      const val2 = [...eventsDates]
      // this.props.handleSelectedTypes(eventsTypes, eventsDates)
      this.props.handleSelectedTypes(val, val2)
    }

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
    let filteredEvents
    if (this.props.filter === 'text'){
      filteredEvents = events.filter(
        (event) => {
          return event.nom.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
        }
      )
    }
    // let type = this.props.filter.slice(0, -1)
    else if (this.props.filter === 'dates'){
      filteredEvents = events.filter(
        (event) => {
          return event.date.indexOf(this.props.search) !== -1;
        }
      )
    }
    else {
      filteredEvents = events.filter(
        (event) => {
          return event.type.indexOf(this.props.search) !== -1;
        }
      )
    }
    let eventsList;
    if (filteredEvents.length > 0){
      eventsList = filteredEvents.map(event => {
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
    }
    else {
      return (
        <div className="container">
          <div className="EventsList">
            No events available
          </div>
        </div>
      );
    }
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
