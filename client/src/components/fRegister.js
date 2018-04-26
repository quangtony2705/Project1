import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
var Url = "http://localhost:9000/"

class Register extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone: '',
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  redirectLogin() {
    this.props.history.push('login')
  }
  checkEmail(link) {
    var arr = link.split('@');
    if (arr.length === 2) {
        return 1;
    } else {
        return 0;
    }
}
  handleClick(event) {
    let that = this
    var payload = {
      "username": this.state.username,
      "password": this.state.password,
      "email": this.state.email,
      "phone": this.state.phone,
      "enable": "enable"
    }
    if (this.state.username.length === 0) {
      alert("Username không được bỏ trống")
    }
    else if (this.state.password.length === 0) {
      alert("Password không được bỏ trống")
    }
    else if (this.state.email.length === 0 || this.checkEmail(this.state.email) === 0) {
      alert("Email không được bỏ trống hoặc Email không đúng")
    }
    else if (this.state.phone.length === 0) {
      alert("Phone không được bỏ trống")
    }
    else {
      axios.get(Url + 'userExist', {
        params: {
          username: this.state.username
        }
      }).then(function (response) {
        if (response.data === 1) {
          alert('username da ton tai')
        } else {
          axios.post(Url + 'insertUser', payload).then(function (response) {
            if (response.status === 200) {
              that.redirectLogin();
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
      })
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
                    <label htmlFor="email">Username*:</label>
                    <input type="text" className="form-control" name="username" value={this.state.username} onChange={e => this.onChange(e)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Password*:</label>
                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={e => this.onChange(e)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email*:</label>
                    <input type="text" className="form-control" name="email" value={this.state.email} onChange={e => this.onChange(e)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Phone*:</label>
                    <input type="text" className="form-control" name="phone" value={this.state.phone} onChange={e => this.onChange(e)} />
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
