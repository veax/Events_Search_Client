import React, { Component } from 'react'
import noimagefound from './assets/noimagefound.png'

class EventPage extends Component{

  state = {
    isExist: true
  }

  handleError = (e) => {
    this.setState({
      isExist: false
    })
  }

  render() {
    // const { event }  = this.props.location.state
    // let image
    // if (this.state.isExist){
    //   image = <img src={event.media_1} alt="some event" onError={this.handleError} />
    // }
    // else {
    //   image = <img src={noimagefound} alt="not found"/>
    // }
    return (
      <div className="container">
        <h5>Event Data</h5>
        {/* <p>{event.nom}</p>
        {image} */}
      </div>
    )
  }
}

export default EventPage
