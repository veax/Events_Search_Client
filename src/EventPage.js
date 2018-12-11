import React, { Component } from 'react'

const fetchEvent = async id =>
{
	const response = await fetch( `http://localhost:8080/evenement/${ id }` );
	const data = await response.json();

	return data;
}

export default class EventPage extends Component
{
	state = {
		event: {}
	}

	constructor( props )
	{
		super( props );

		if( props.location.state )
			this.state = {
				event: props.location.state.event
			}
	}

	componentDidMount()
	{
		fetchEvent( this.props.match.params.event_id )
			.then( event => this.setState( { event } ) )
	}

	render()
	{
		const { event } = this.state;

		return <div className="container">
			<h5>Event Data</h5>
			<p>{ event.nom }</p>
			<img src={ event.media_1 } alt="some text" />
		</div>
	}
}
