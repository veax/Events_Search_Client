import React, { Component } from 'react'

export class Bookmark_Events extends Component {


  componentDidMount(){
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

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Bookmark_Events
