import React, { Component } from 'react'
import noimagefound from './assets/noimagefound.png'


const fetchEvent = async id =>
{
	const response = await fetch( `http://localhost:8080/evenement/${ id }` );
	const data = await response.json();

	return data;
}

export default class EventPage extends Component
{
	state = {
		event: {},
		isExist: true
	}

	handleError = ( e ) =>
	{
		this.setState( {
			isExist: false
		} )
	}

	componentDidMount()
	{
		if( this.props.location.state )
			this.setState( {
				event: this.props.location.state.event
			} )
		else
		{
			fetchEvent( this.props.match.params.event_id )
				.then( event => this.setState( { event } ) )
		}
	}

	render()
	{
		const { event } = this.state;
		let image
		if( this.state.isExist )
		{
			image = <img src={ event.media_1 } alt="some event" onError={ this.handleError } />
		}
		else
		{
			image = <img src={ noimagefound } alt="not found" />
		}
		return <div className="container">
			<h5>Event Data</h5>
			<p>{ event.nom }</p>
			{ image }
		</div>
	}
}
