import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
var Url = "http://localhost:9000/"

class Register extends Component {
  state = {
    username: '',
    password: ''
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  redirectLogin() {
    this.props.history.push('login')
  }
  handleClick(event) {
    let that = this
    var payload = {
      "username": this.state.username,
      "password": this.state.password
    }
    if (this.state.username.length === 0) {
      alert("Nhap username")
    }
    else if (this.state.password.length === 0) {
      alert("Nhap password")
    }
    else {
      axios.post(Url + 'insertUser', payload).then(function (response) {
        if (response.status === 200) {
          that.redirectLogin();
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="login-panel panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Sign Up</h3>
              </div>
              <div className="panel-body">
                <form className="form" role="form">
                  <div className="form-group">
                    <label htmlFor="email">Username:</label>
                    <input type="text" className="form-control" name="username" value={this.state.username} onChange={e => this.onChange(e)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={e => this.onChange(e)} />
                  </div>
                  <div>
                    <label className="custom-control custom-checkbox">
                      <span className="custom-control-description small">Already registered ?<Link to='/login'> Sign In</Link></span>
                    </label>
                  </div>
                  <button type="button" className="btn btn-defaul float-right" id="btnRegister" onClick={() => this.handleClick(event)}>Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register
