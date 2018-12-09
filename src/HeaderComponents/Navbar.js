import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

class Navbar extends Component {
  state = {
    isConnected: false
  }

  handleConnection = (res) => {
      this.setState({
        isConnected: res.success
      })
  }

  render(){
    const links = this.state.isConnected ? <SignedOutLinks handleConnection={this.handleConnection}/> : <SignedInLinks handleConnection={this.handleConnection}/> 
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
