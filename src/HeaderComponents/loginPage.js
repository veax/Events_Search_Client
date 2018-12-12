import React, { Component } from 'react'

class loginPage extends Component {

    state = {
        userid: '',
        password: '',
        formErrors: {userid:'', password:''},
        useridValid: false,
        passwordValid: false,
        formValid: false
    }

    handleChange = (e) => {
        let id = e.target.id
        let pass = e.target.value
        this.setState({
            [id]: pass,
        }, () => {this.validateField(id, pass)})
    }

    validateField(fieldName, value) {
      let { formErrors, useridValid, passwordValid } = this.state
      switch(fieldName) {
          case 'userid':
            useridValid = value.length >= 4;
            formErrors.userid = useridValid ? '' : 'login is too short';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            formErrors.password = passwordValid ? '': 'password is too short';
            break;
          default:
            break;
        }
        this.setState({formErrors: formErrors,
            useridValid: useridValid,
            passwordValid: passwordValid
            }, this.validateForm);
    }
    validateForm() {
        this.setState({formValid: this.state.useridValid &&
        this.state.passwordValid});
    }

    handleReset = () => {
        this.setState({
            userid: '',
            password: ''
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let headers = new Headers();
        headers.set( "Content-Type", "application/json" );
        let user = document.getElementById('userid').value;
        let password = document.getElementById('password').value;

        fetch('http://localhost:8080/user/signin', {
            method: 'POST',
            headers,
            body:JSON.stringify({login:user, password:password})
        }).then((res) => res.json())
        .then((data) =>  {
            console.log(data)
            this.props.location.handleConnection(data)
            this.props.history.push('/')
        })
        .catch((err)=>console.log(err))
    }

  render() {
    return (
      <div className="section section-login">
        <div className="valign-wrapper row login-box">
            <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
                <form action="/" method="POST" id="loginForm" onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="card-content">
                        <span className="card-title">Enter login details</span>
                        <div className="row">
                        <div className="input-field col s12">
                            <span>{this.state.formErrors.userid}</span>
                            <input type="text" value={this.state.loginInput} onChange = {this.handleChange} className={`validate
                 ${this.state.formErrors.userid ? 'invalid' : ''}`} name="uid" id="userid" placeholder="login"/>
                        </div>
                        <div className="input-field col s12">
                            <span>{this.state.formErrors.password}</span>
                            <input type="password" value={this.state.passInput} onChange = {this.handleChange} className={`validate
                 ${this.state.formErrors.password ? 'invalid' : ''}`} name="pwd" id="password" placeholder="password" />
                        </div>
                        </div>
                    </div>
                    <div className="card-action right-align">
                        <input type="reset" id="reset" className="btn-flat grey-text waves-effect" onClick={this.handleReset}/>
                        <input type="submit" disabled={!this.state.formValid} className="btn teal waves-effect waves-light" value="Enter as user" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
  }
}

export default loginPage
