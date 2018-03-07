import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
var Url = "http://localhost:9000/"

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  redirectIndex() {
    this.props.history.push('/');
  }
  onSubmit() {
    let that = this;
    axios.get(Url + 'login', {
      params: {
        username: this.state.username,
        password: this.state.password
      }
    })
      .then(function (response) {
        if (response.data.username.length > 0) {
          var user = response.data.username;
          localStorage.setItem('user', user)
          that.redirectIndex()
        }
        else {
          if (that.state.username === "") {
            alert("Nhap username")
          }
          else if (that.state.password === "") {
            alert("Nhap password")
          }
          else {
            alert("Dang nhap that bai - kiem tra lai thong tin")
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    localStorage.clear();
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="login-panel panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Sign In</h3>
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
                      <span className="custom-control-description small">Not registered ? <Link to='/register'> Sign Up</Link></span>
                    </label>
                  </div>
                  <button type="button" className="btn btn-defaul float-right" id="btnlogin" onClick={() => this.onSubmit()}>Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login