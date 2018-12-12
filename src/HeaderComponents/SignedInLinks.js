import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SignedInLinks extends Component {

    handleConnection = (res) => {
        this.props.handleConnection(res)
    }
    render() {
        return (
            <div>
                <Link to = {{pathname: '/login', handleConnection: this.handleConnection}} id = "login" className="waves-effect waves-light btn-large" >Login</Link>
                <Link to ="/signup" id="signup" className="waves-effect waves-light btn-large purple accent-4">Sign Up</Link>
            </div>
        )
    }
}

export default SignedInLinks
