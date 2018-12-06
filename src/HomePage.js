import React, { Component } from 'react'
import SearchEventBar from './SearchEventBar'
import EventsList from './EventsList'

export class HomePage extends Component {
    constructor(){
        super()
        this.state = {
            searchText: '',
            eventsTypes: [],    // have to be sets to exclude repeating values
            eventsDates: []
        };
    }

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
