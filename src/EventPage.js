import React from 'react'

const EventPage = props => {
  // let id = props.match.params.event_id
  const { event }  = props.location.state
  return (
    <div className="container">
      <h5>Event Data</h5>
      <p>{event.nom}</p>
      <img src={event.media_1} alt="some text"/>
    </div>
  )
}

export default EventPage
