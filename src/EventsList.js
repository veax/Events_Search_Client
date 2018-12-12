import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { exctractEventsData, types, dates } from './helperFunctions/exctractEventsData'
import noimagefound from './assets/noimagefound.png'

class EventsList extends Component {
  state = {
    events: [],
    isLoading: true,
    isImageExist: true
  }

  componentDidMount(){
    this.setState({
      isLoading: true
    });
    const fetchEvents = async () => {
      const response = await fetch('http://localhost:8080/evenement/all')
      const data = await response.json()
      this.setState({
        events: data,
        isLoading: false
      })
      exctractEventsData(data)
      this.props.handleSelectedTypes(types, dates)
    }
    fetchEvents()
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.filter === 'location'){
      const { search } = nextProps
      const lat = search[0]
      const long = search[1]
      const rad = search[2]
      fetch('http://localhost:8080/evenement/byLocation', {
        method: 'POST',
        headers : new Headers(),
        body:JSON.stringify({latitude: lat, longitude: long, radius: rad})
      }).then((res) => res.json())
      .then((data) =>  {
        console.log(data)
        this.setState({
            events: data
        })
      })
      .catch((err)=>console.log(err))
    }
  }

  handleError = (e) => {
    this.setState({
      isImageExist: false
    })
  }

  
  render() {
    const { events, isLoading } = this.state
    const { filter, search } = this.props
    let filteredEvents, type
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

    if (filter === 'text'){
      filteredEvents = events.filter(
        (event) => {
          return event.nom.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
      )
    }
    else if (filter === 'location'){
      filteredEvents = events
    }
    else {
      filter === 'date'? type = 'date' : type='type'
      filteredEvents = events.filter(
        (event) => {
          return event[type].indexOf(search) !== -1;
        }
      )
    }

    // -----DEBUG events key repetition
    // filteredEvents.forEach(event => {
    //   console.log(event.recordid)
    // })
    // console.log(filteredEvents.length)

    let eventsList = filteredEvents.map(event => {
      let image
      if (this.state.isImageExist){
        image = <div className="event-img" style={{backgroundImage:`url(${event.media_1})`}} onError={this.handleError}></div>
      }
      else {
        image = <div className="event-img" style={{backgroundImage:`url(${noimagefound})`}}></div>
      }

      return filteredEvents.length > 0 ? (
        <div key={event.recordid} className="card hoverable event">
          <div className="card-image">
            {image}
            <span className="card-title">{event.nom}</span>
          </div>
          <div className="card-content">{`${event.description.substring(0,150)}... `}</div>
          <Link to={{pathname: '/events/' + event.recordid, state: {event: event} }} className="waves-effect waves-light btn-small deep-purple accent-2">See more</Link>
        </div>
      ): null
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
