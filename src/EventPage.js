import React, { Component } from 'react'
import noimagefound from './assets/noimagefound.png'
import user_icon from './assets/user_icon.jpg'


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
  
  handleError = (e) => {
    this.setState({
      isExist: false
    })
  }

	componentDidMount()
	{
    if( this.props.location.state )
			this.setState({
        event: this.props.location.state.event
      })
    else {
      fetchEvent( this.props.match.params.event_id )
			.then( event => this.setState( { event } ) )
    }
	}

	render()
	{
		const { event } = this.state;
    let image
    if (this.state.isExist){
      image = <img src={event.media_1} alt="some event" onError={this.handleError} />
    }
    else {
      image = <img src={noimagefound} alt="not found"/>
    }
		return (
      <div className="container">
        <div className="card event_container">
          <span class="card-title">{ event.nom }</span>
          {/* <h4>{ event.nom }</h4> */}
          <blockquote>{ event.description }</blockquote>
          <div className="row">
            <div className="col s6">
              {image}
            </div>
            <div className="col s6">
              <h6>some stairs to note event</h6>
              <div className="stars_container">
                <i class="material-icons small">grade</i>
                <i class="material-icons small">grade</i>
                <i class="material-icons small">grade</i>
                <i class="material-icons small">grade</i>
                <i class="material-icons small">grade</i>
              </div>
            </div>
          </div>
          <div className="row comment_block">
            <div className="comment_section col s6">
              <h5>Comments: </h5>
                <ul className="collection">
                  <li class="collection-item avatar">
                    <img src={user_icon} alt="" class="circle" />
                    <span class="title">Username</span>
                    <p>First Line </p>
                    <div className="divider"></div>
                    <li className="collection_item comment">User Comment</li>
                  </li>
                  <li class="collection-item avatar">
                    <img src={user_icon} alt="" class="circle" />
                    <span class="title">Username</span>
                    <p>First Line </p>
                    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                    <div className="divider"></div>
                    <li className="collection_item comment">User Comment</li>
                  </li>
                  <li class="collection-item avatar">
                    <img src={user_icon} alt="" class="circle" />
                    <span class="title">Username</span>
                    <p>First Line </p>
                    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                    <div className="divider"></div>
                    <li className="collection_item comment">User Comment</li>
                  </li>
                </ul>
            </div>
            <div className="col s6">
              <label for="textarea1">Write your thoughts about it...</label>
              <textarea id="textarea1" class="materialize-textarea"></textarea>
              <a class="waves-effect waves-light btn add_comment_btn">add new comment</a>
            </div>
          </div>
          
        </div>   
      </div>)
	}
}
