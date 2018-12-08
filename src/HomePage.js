import React, { Component } from 'react'
import SearchEventBar from './HeaderComponents/SearchEventBar'
import AdvancedSearch from './HeaderComponents/AdvancedSearch'
import EventsList from './EventsList'

export class HomePage extends Component {

    state = {
        filter:'',
        eventsTypes: [],    // have to be sets to exclude repeating values
        eventsDates: [],
        search:''
    };

    handleTextFilter = (textValue) => {
        this.setState({
            search: textValue,
            filter:'text'
        })
    }

    handleSelectedTypes = (eventType, eventDate) => {
        this.setState(prevState => ({
            // eventsTypes: [...prevState.eventsTypes, eventType],
            // eventsDates: [...prevState.eventsDates, eventDate],
            eventsTypes: eventType,
            eventsDates: eventDate
        }))
    }

    handleSelectChange = (value, filter) => {
        console.log('home', value, ':', filter)
        this.setState({
            search: value,
            filter
        })
    }
    

    render() {
        return (
            <div>
                <SearchEventBar onChangeTextFilter = {this.handleTextFilter} />
                <AdvancedSearch types={this.state.eventsTypes} dates={this.state.eventsDates} handleSelectChange={this.handleSelectChange}/>
                <EventsList search={this.state.search} handleSelectedTypes={this.handleSelectedTypes} filter={this.state.filter}/>
            </div>
        )
    }
}

export default HomePage
