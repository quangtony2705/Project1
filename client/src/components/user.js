import React, { Component } from 'react';
import '../../public/css/style.css'
import Menu from './Menu'
import axios from 'axios';
import Foot from './foot.js';
//import Header from './header';
var Url = window.config.API_URL;

class User extends Component {
    state = {
        user: [],
        name: '',
        email: '',
        phone: '',
        enable: '',
        key: '',
    }

    componentWillMount() {
        if (localStorage.user === undefined) {
            window.location.href = '/login';
        }
        let that = this
        that.loadUser();
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    loadUserById(_id) {
        let that = this
        axios.get(Url + 'loaduserbyid', {
            params: {
                id: _id
            }
        }).then(function (response) {
            that.setState({
                username: response.data[0].username,
                email: response.data[0].email,
                phone: response.data[0].phone,
                enable: response.data[0].enable,
                key: response.data[0]._id
            })
        })
    }
    loadUser() {
        let that = this
        axios.get(Url + 'loaduser').then(function (response) {
            that.setState({
                user: response.data
            });
        })
    }
    updateUser(e) {
        let that = this
        var payload = {
            "id": this.state.key,
            "username": this.state.username,
            "email": this.state.email,
            "phone": this.state.phone,
            "enable": this.state.enable
        }
        axios.put(Url + 'updateUser', payload).then(function (response) {
            that.setState({ user: [] })
            that.loadUser();
        })
    }

    render() {
        return (
            <div id='wrapper'>
                <Menu />
                <div id="page-wrapper">
                    <h1>User</h1>
                    <table className="table table-hover">
                        <thead>
                            <tr bgcolor='#f5f5f5'>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Enable</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.user.map(item => {
                                    return (
                                        <tr className="" key={item._id} >
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.enable}</td>
                                            <td><button type="button" className="btn" data-toggle="modal" data-target="#modalEditUser" onClick={e => this.loadUserById(item._id)}><i className="fa fa-edit"></i> </button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <div className="modal fade" id="modalEditUser">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit User</h4>
                                </div>
                                <div className="modal-body" key={this.state.key}>
                                    <div className="form-group">
                                        <label>UserName:</label>
                                        <input type="text" readOnly="true" className="form-control" placeholder="username" name="username" value={this.state.username} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="text" className="form-control" placeholder="email" name="email" value={this.state.email} onChange={e => this.onChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone:</label>
                                        <input type="text" className="form-control" placeholder="phone" name="phone" value={this.state.phone} onChange={e => this.onChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Enable:</label>
                                        <input type="text" className="form-control" placeholder="enable" name="enable" value={this.state.enable} onChange={e => this.onChange(e)} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-secondary" onClick={e => this.updateUser(e)}>Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Foot />
            </div>
        )
    }
}
export default User
