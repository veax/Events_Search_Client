import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () =>  {
  return (
    <div className="App-header">
      <div className="container">
          <div className="header-panel">
              <Link to = '/' id = "titleHomeLink">Events Search App</Link>
              <div className="buttons-panel">
              <Link to = '/login' id = "login" className="waves-effect waves-light btn-large">Login</Link>
              <a href="/signup" className="waves-effect waves-light btn-large purple accent-4">Sign Up</a>
              </div>
          </div>
          <div className="divider"></ div>
      </div>
    </div>
  )
}

export default Navbar
