import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { loadState, saveState } from '../helperFunctions/sessionStorage'

const persistedLoad = loadState()
class Navbar extends Component {

  state = {
    persistedState: persistedLoad
  }

  handleConnection = (res) => {
    if (!res.success){
      sessionStorage.clear()
      this.setState({
        persistedState: null
      })
    }
    else {
      saveState(res) // using sessionStorage
      this.setState({
        persistedState: loadState()
      })
    } 
  }
  render(){
    const { persistedState } = this.state
    const links = persistedState && persistedState.success ? <SignedOutLinks handleConnection={this.handleConnection} login={persistedState.idUser}/> : <SignedInLinks handleConnection={this.handleConnection}/> 
    return (
      <div className="App-header">
        <div className="container">
            <div className="header-panel">
                <Link to = '/' id = "titleHomeLink">Events Search App</Link>
                <div className="buttons-panel">
                  { links }
                </div>
            </div>
            <div className="divider"></ div>
        </div>
      </div>
    )
  }
}

export default Navbar
