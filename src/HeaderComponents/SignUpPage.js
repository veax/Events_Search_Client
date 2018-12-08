import React, { Component } from 'react'

class SignUpPage extends Component {

    state = {
        userid: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleReset = () => {
        this.setState({
            userid: '',
            password: ''
        })
    }

    handleSubmit = (e) => {
        // console.log(this.props)
        e.preventDefault();
        let user = document.getElementById('userid').value;
        let password = document.getElementById('password').value;

        fetch('http://localhost:8080/inscription', {
                method: 'POST',
                headers : new Headers(),
                body:JSON.stringify({login:user, password:password})
            }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
            .then(() => {
                this.props.history.push('/')
            })
    }


  render() {
    return (
      <div className="section section-login">
        <div className="valign-wrapper row login-box">
            <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
                <form action="/" method="POST" id="signUpForm" onSubmit={this.handleSubmit}>
                    <div className="card-content">
                        <span className="card-title">Welcome! Please choose your login and new password</span>
                        <div className="row">
                        <div className="input-field col s12">
                            <input type="text" className="validate" name="uid" id="userid" placeholder="your login" value={this.state.loginInput} onChange = {this.handleChange}/>
                        </div>
                        <div className="input-field col s12">
                            <input type="password" className="validate" name="pwd" id="password" placeholder="your password" value={this.state.passInput} onChange = {this.handleChange}/>
                        </div>
                        </div>
                    </div>
                    <div className="card-action right-align">
                        <input type="reset" id="reset" className="btn-flat grey-text waves-effect" onClick={this.handleReset}/>
                        <input type="submit" className="btn teal waves-effect waves-light" value="Create account" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
  }
}

export default SignUpPage
