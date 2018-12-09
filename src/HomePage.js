import React, { Component } from 'react'
import SearchEventBar from './HeaderComponents/SearchEventBar'
import AdvancedSearch from './HeaderComponents/AdvancedSearch'
import EventsList from './EventsList'

export class HomePage extends Component {

    state = {
        filter:'',
        eventsTypes: [],    // have to be sets to exclude repeating values
        eventsDates: [],
        search: []
    };
    handleSelectedTypes = (eventType, eventDate) => {
        this.setState( () => ({
            eventsTypes: eventType,
            eventsDates: eventDate
        }))
    }
    handleSelectChange = (value, filter) => {
        this.setState({
            search: value,
            filter
        })
    }
    

    render() {
        return (
            <div>
                <SearchEventBar onChangeTextFilter = {this.handleSelectChange} />
                <AdvancedSearch types={this.state.eventsTypes} dates={this.state.eventsDates} handleSelectChange={this.handleSelectChange} loadEventsLoc={this.loadEventsLoc}/>
                <EventsList search={this.state.search} handleSelectedTypes={this.handleSelectedTypes} filter={this.state.filter} />
            </div>
        )
    }
}

export default HomePage
