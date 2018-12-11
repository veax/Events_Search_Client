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
  

  handleStarChange = () => {

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

    const stars = () => {
      let stars_array = []
      for (let i = 0; i < 5; i++){
        stars_array.push(<i key={i} onChange={this.handleStarChange} className="material-icons small">grade</i>)
      }
      return stars_array
    }

		return (
      <div className="container">
        <div className="card event_container">
          <span className="card-title">{ event.nom }</span>
          <blockquote>{ event.description }</blockquote>
          <div className="row">
            <div className="col s6">
              {image}
            </div>
            <div className="col s6">
              <h6>some stairs to note event</h6>
              <div className="stars_container">
                {stars()}
              </div>
            </div>
          </div>
          <div className="row comment_block">
            <div className="comment_section col s6">
              <h5>Comments: </h5>
                <ul className="collection">
                  <li className="collection-item avatar">
                    <img src={user_icon} alt="" className="circle" />
                    <span className="title">Username</span>
                    <p>First Line </p>
                    <div className="divider"></div>
                    <div className="collection_item comment">User Comment</div>
                  </li>
                  <li className="collection-item avatar">
                    <img src={user_icon} alt="" className="circle" />
                    <span className="title">Username</span>
                    <p>First Line </p>
                    <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                    <div className="divider"></div>
                    <div className="collection_item comment">User Comment</div>
                  </li>
                  <li className="collection-item avatar">
                    <img src={user_icon} alt="" className="circle" />
                    <span className="title">Username</span>
                    <p>First Line </p>
                    <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                    <div className="divider"></div>
                    <div className="collection_item comment">User Comment</div>
                  </li>
                </ul>
            </div>
            <div className="col s6">
              <label htmlFor="textarea1">Write your thoughts about it...</label>
              <textarea id="textarea1" className="materialize-textarea" placeholder="leave your honest opinion"></textarea>
              <a className="waves-effect waves-light btn add_comment_btn">add new comment</a>
            </div>
          </div> 
        </div>   
      </div>)
	}
}
