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
    comments: [], // list of comments for this event
    newComment: '',
    isImageExist: true,
  }
  
  handleImageError = (e) => {
    this.setState({
      isImageExist: false
    })
  }

	componentDidMount()
	{
    if( this.props.location.state )
			this.setState({
        event: this.props.location.state.event,
      })
    else {
      fetchEvent( this.props.match.params.event_id )
			.then( event => this.setState( { event } ) )
    }
  }
  

  handleStarClick = (e) => {
    for (let i = 0; i <= e.target.id; i++){
      let star = document.getElementById(i)
      star.style.color = "#ffca28"
    }
    if (e.target.id < 4){
      let next = parseInt(e.target.id) + 1
      for (let i = next; i <= 4; i++ ){
        let star = document.getElementById(i)
        star.style.color = "#000"
      }
    }
  }

  handleTextChange = (e) => {
    this.setState({
      newComment: e.target.value
    })
  }

  handleAddComment = (e) => {

    e.preventDefault()
    let text = document.getElementById('textarea1').value;
    let id = this.props.match.params.event_id
    console.log(text)
    console.log(id)
    fetch('http://localhost:8080/commentaire/ajout', {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify({message:text, idEvent: id})
        }).then((res) => res.json())
        .then((data) =>  {
            console.log(data)
            this.setState({
              comments: data
            })
        })
        .catch((err)=>console.log(err))
        .then(() => {
            
        })
  }


	render()
	{
		const { event, comments } = this.state;
    let image
    if (this.state.isImageExist){
      image = <img src={event.media_1} alt="some event" onError={this.handleImageError} />
    }
    else {
      image = <img src={noimagefound} alt="not found"/>
    }

    const stars = () => {
      let stars_array = []
      for (let i = 0; i < 5; i++){
        stars_array.push(<i key={i} id={i} onClick={this.handleStarClick} className="material-icons small">grade</i>)
      }
      return stars_array
    }

    let commentsList = comments.map((comment, i) => {
      return (
        <li className="collection-item avatar" key={i}>
          <img src={user_icon} alt="" className="circle" />
          {/* <span className="title">Username</span>
          <p>First Line </p>
          <div className="divider"></div>
          <div className="collection_item comment">User Comment</div> */}
        </li>
      )
    })

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
                  { commentsList }
                </ul>
            </div>
            <div className="col s6">
              <label htmlFor="textarea1">Write your thoughts about it...</label>
              <textarea onChange={this.handleTextChange} value={this.state.newComment} id="textarea1" className="materialize-textarea" placeholder="leave your honest opinion"></textarea>
              <button onClick = {this.handleAddComment}className="waves-effect waves-light btn add_comment_btn">add new comment</button> 
            </div>
          </div> 
        </div>   
      </div>)
	}
}
