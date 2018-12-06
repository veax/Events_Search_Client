import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class EventsList extends Component {
  constructor(props){
    super(props);

    this.state = {
      events: [],
      isLoading: true,
      search: ''
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


    let exctractedTypes = (events) => {
      let extractEventsTypes = new Set();
      let extractEventsDates = new Set();
      events.forEach((event) => {
        extractEventsTypes.add(event.type)
        extractEventsDates.add(event.lieu)
      })
    }
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

    let extractEventsTypes = new Set();
    let extractEventsDates = new Set();
    events.forEach((event) => {
      extractEventsTypes.add(event.type)
      extractEventsDates.add(event.lieu)
    })
    console.log(extractEventsTypes)
    console.log(extractEventsDates)
    // this.props.onLoad(extractEventsTypes)




    let filteredEvents = events.filter(
      (event) => {
        return event.nom.toLowerCase().indexOf(this.props.textFilter.toLowerCase()) !== -1;
      }
    )

    return (
      <div className="container">
        <div className="EventsList">
          {filteredEvents.map((event)=> 
            <div key = {event.recordid} className="card hoverable event">
              <div className="card-image">
                <div className="event-img"style={{backgroundImage:`url(${event.media_1})`}}></div>
                <span className="card-title">{event.nom}</span>
              </div>
              <div className="card-content">{`${event.description.substring(0,150)}... `}</div>
              <Link to={{pathname: '/events/' + event.recordid, state: {event: event} }} className="waves-effect waves-light btn-small deep-purple accent-2">See more</Link>
            </div>
          )} 
        </div>
      </div>
    );
  }
}

export default EventsList;
