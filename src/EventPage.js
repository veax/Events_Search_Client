import React, { Component } from 'react'
import noimagefound from './assets/noimagefound.png'
import user_icon from './assets/user_icon.jpg'
import { loadState, saveState } from './helperFunctions/sessionStorage'

let persistedLoad = null
let user = null
let headers = new Headers();
headers.set( "Content-Type", "application/json" );

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
    starNote: '',
    isMarked: false,
    isImageExist: true,
    averageNote: ''
  }

  // loading event data and comments for this event
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

    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:8080/commentary/getByEvent/${this.props.match.params.event_id}`)
      const data = await response.json()
      this.setState({
        comments: data
      })
    }
    const fetchAverageNote = async () => {
      const response = await fetch(`http://localhost:8080/evaluation/getByEvent/${this.props.match.params.event_id}`)
      const data = await response.json()
      this.setState({
        averageNote: data
      })
    }

    fetchEvents()
    fetchAverageNote()
  }


  handleImageError = (e) => {
    this.setState({
      isImageExist: false
    })
  }

  handleBookMark = (e) => {
    const postFetchBookmarks = (action) => {
      let id = this.props.match.params.event_id
      fetch(`http://localhost:8080/bookmarks/${action}`, {
        method: 'POST',
        headers,
        body:JSON.stringify({eventId: id, userId: user})
        })
      .then((res) => res.json())
      .then((data) =>  {
          let bookmarks
          user = loadState()
          console.log(user)
          if (user.bookmarks.length <= 2){
            user.bookmarks = "["+id+"]"
          }
          else {
            bookmarks = user.bookmarks.substring(0, user.bookmarks.length-1)+","+id+"]"
            user.bookmarks = bookmarks
          }
      })
      .catch((err)=>console.log(err))
    }

    let mark = document.getElementById("bookmark_add")
    if (!this.state.isMarked){
      mark.style.color = "#b71c1c"
      this.setState({
        isMarked: true
      })
      postFetchBookmarks("add")
    }
    else {
      mark.style.color = "#9e9e9e"
      this.setState({
        isMarked: false
      })
      postFetchBookmarks("remove")
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
    this.setState({
      starNote: parseInt(e.target.id) + 1
    })
  }

  handleAddNote = (e) => {
    console.log(this.state.starNote)
    let id = this.props.match.params.event_id
    fetch('http://localhost:8080/evaluation/add', {
      method: 'POST',
      headers,
      body:JSON.stringify({eventId: id, userId: user, evaluation: this.state.starNote})
    })
    .then((res) => res.json())
    .then((data) =>  {
        console.log(data)
    })
    .catch((err)=>console.log(err))
  }

  handleParkings = (e) => {
    console.log(e.target)
  }

  handleTextChange = (e) => {
    this.setState({
      newComment: e.target.value
    })
  }

  handleAddComment = (e) => {
    e.preventDefault()
    let { newComment } = this.state
    let id = this.props.match.params.event_id
    
    console.log(newComment)
    console.log(id)
    console.log(user)
    fetch('http://localhost:8080/commentary/add', {
      method: 'POST',
      headers,
      body: JSON.stringify({message: newComment, idUser: user, idEvent: id})
    }).then((res) => res.json())
    .then((data) =>  {
        console.log(data)
        let addComment = {idUser: user, message: newComment}
        this.setState({
          comments: [...this.state.comments, addComment],
          newComment: ''
        })
    })
    .catch((err)=>console.log(err))
    
  }


	render()
	{
    persistedLoad = loadState()
    user = persistedLoad ? persistedLoad.idUser : null  // userId if connected
    let bookmark_btn = user ? <i onClick={this.handleBookMark} className="small material-icons" id="bookmark_add" >bookmark</i> : null
    const { event, comments, isImageExist } = this.state;
    console.log(user) // for debugging
    let image
    if (isImageExist){
      image = <img className="img-responsive" src={event.media_1} alt="some event" onError={this.handleImageError} />
    }
    else {
      image = <img className="img-responsive" src={noimagefound} alt="not found"/>
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
          <span className="title">{comment.idUser}</span>
          <div className="divider"></div>
          <div className="collection_item comment">{comment.message}</div>
        </li>
      )
    })

		return (
      <div className="container">
        <div className="card event_container">
          <span className="card-title">{ event.nom }</span>
          { bookmark_btn }
          { this.state.averageNote }
          <blockquote>{ event.description }</blockquote>
          <div className="row">
            <div className="col m12 l6">
              {image}
            </div>
            <div className="col m12 l6 user_actions_group">
              <div className="stars_container">
                {stars()}
              </div>
              <button onClick = {this.handleAddNote} disabled={!user} className="waves-effect waves-light btn post_star_btn">note event</button> <br />
              <i className="small material-icons car-icon ">directions_car</i>
              <h6 className="parking-title-btn">Looking for parking near by this event</h6>
              <button onClick = {this.handleParkings} className="waves-effect waves-light btn blue darken-3">get list of parkings</button> 
            </div>
          </div>
          <div className="row comment_block">
            <div className="comment_section col s12 m6">
              <h5>Comments: </h5>
                <ul className="collection">
                  { commentsList }
                </ul>
            </div>
            <div className="col s12 m6">
              <label htmlFor="textarea1">Write your thoughts about it...</label>
              <textarea onChange={this.handleTextChange} value={this.state.newComment} id="textarea1" className="materialize-textarea" placeholder="leave your honest opinion"></textarea>
              <button onClick = {this.handleAddComment} disabled={!user} className="waves-effect waves-light btn add_comment_btn green darken-2">add new comment</button> 
            </div>
          </div> 
        </div>   
      </div>)
	}
}
