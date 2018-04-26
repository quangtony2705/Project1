import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
var Url = "http://localhost:9000/"

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  componentDidMount() {
    this.clearText();
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  redirectIndex() {
    this.props.history.push('/');
  }
  redirectIndeAdmin() {
    this.props.history.push('/admin');
  }
  clearText() {
    this.setState({
      username: '',
      password: '',
    });
  }
  onSubmit() {
    let that = this;
    if (that.state.username === "") {
      alert(" username is not emtry")
    }
    else if (that.state.password === "") {
      alert("password is not emtry")
    }
    else {
      axios.get(Url + 'login', {
        params: {
          username: this.state.username,
          password: this.state.password
        }
      })
        .then(function (response) {
          if (response.data.username === '') {
            alert("can not find your account");
          }
          else {
            if (response.data[0].enable === "enable") {
              var name = response.data[0].username;
              localStorage.setItem('user', name)
              if (name === 'admin') {
                that.redirectIndeAdmin()
              }
              else {
                that.redirectIndex()
              }
            }
            else {
              alert("your account is blocked")
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  render() {
    localStorage.setItem("user","");
    return (
      <div>
        <div className="header__main  clearfix">
          <div className="container">
            <div className="row">
              <a className="toggle-nav visible-xs visible-sm" data-target="#hd-container" data-effect="hd-effect-4">
                <i className="hd hd-nav"></i>
              </a>
              <a className="toggle-search visible-xs visible-sm" data-target="#main-search">
                <i className="hd hd-search"></i>
              </a>

              <div id="logo" className="logo-wrapper col-md-4">
                <a href="/">
                  <img className="hidden-xs hidden-sm logo" style={{ maxHeight: '60px', margin: '-6px 0', width: '225px', height: 'auto' }} src={require('../../public/images/logo4.png')} alt="logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    );
  }
}
export default Login