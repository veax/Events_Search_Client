import React, { Component } from 'react'
import SearchEventBar from './HeaderComponents/SearchEventBar'
import EventsList from './EventsList'

export class HomePage extends Component {

    state = {
        searchText: '',
        eventsTypes: [],    // have to be sets to exclude repeating values
        eventsDates: []
    };

    handleTextFilter = (textValue) => {
        this.setState({
            searchText: textValue
        })
    }

    handleSelectedTypes = (eventType) => {
        this.setState(prevState => ({
            eventsTypes: [...prevState.eventsTypes, eventType]
        }))
    }
    

    render() {
        return (
            <div>
                <SearchEventBar onChangeTextFilter = {this.handleTextFilter} />
                <EventsList textFilter={this.state.searchText} onLoad={this.handleSelectedTypes}/>
            </div>
        )
    }
}

export default HomePage
