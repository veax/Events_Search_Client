import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { loadState, saveState } from '../helperFunctions/localStorage'

const persistedLoad = loadState()

class Navbar extends Component {
  state = {
    persistedState: persistedLoad
  }

  handleConnection = (res) => {
      if (!res.success){
        console.log('failed to login')
        sessionStorage.clear()
        this.setState({
          persistedState: null
        })
      }
      else {
        console.log('logged in successfully!')
        saveState(res) // using sessionStorage
        this.setState({
          persistedState: loadState()
        })
      }
      
  }
  render(){
    const { persistedState } = this.state
    console.log(persistedState)
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
