import React, { Component } from 'react'

export class EventPage extends Component {

  state = {
      event: {},    // {} because event is an object
      event_id: null
  }
  
  componentDidMount(){
      console.log(this.props)
      let id = this.props.match.params.event_id
      const { event }  = this.props.location.state
      console.log(event);
      this.setState({
          event: event,
          event_id: id
      })
  }

  render() {
    return (
      <div className="container">
        <h5>Event Data</h5>
        <p>{this.state.event.nom}</p>
        <img src={this.state.event.url_internet_1} alt="some text"/>
      </div>
    )
  }
}

export default EventPage
