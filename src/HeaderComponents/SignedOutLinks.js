import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SignedOutLinks extends Component {

    handleConnection = () => {
        this.props.handleConnection({success: false})
    }

    render() {
        return (
            <div>
              <Link to ="/" onClick={this.handleConnection} id="singout" className="waves-effect waves-light btn-large purple accent-4">Sign Out</Link>
            </div>
        )
    }
  
}

export default SignedOutLinks
