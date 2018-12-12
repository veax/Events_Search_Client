import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SignedOutLinks extends Component {

    handleConnection = () => {
        console.log(this.props.login)
        let headers = new Headers();
        headers.set( "Content-Type", "application/json" );
        fetch('http://localhost:8080/user/signout', {
                method: 'POST',
                headers,
                body:JSON.stringify({login: this.props.login})
        })
        .then((res) => res.json())
        .then((data) =>  {
            // console.log(data)
            this.props.handleConnection({success: false})
        })
        .catch((err)=>console.log(err))
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
