import React, { Component } from 'react';
import '../../public/css/style.css'
import Menu from './Menu'


class User extends Component {
    state = {
        user: [],
        name: '',

    }

    componentWillMount() {
        if (localStorage.user === undefined) {
            window.location.href = '/login';
        }
        var list = ['Ops Team', 'Sale/Advertiser', 'Call Center', 'Shipper']
        this.setState({
            user: list
        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    createUser(event) {
        var list = this.state.user;
        if (this.state.name.length === 0) {
            alert('Khong duoc bo trong')
        } else {
            list.push(this.state.name);
        }
        this.setState({
            user: list
        });
    }

    render() {
        return (
            <div id='wrapper'>
                <Menu />
                <div id="page-wrapper">
                    <a href="/" className='btt-info btt-Right link-back'><i className="fa fa-sign-out fa-fw"></i> Quay lại</a>
                    <h1>User</h1>
                    <div className='dialog'>
                        <button type="button" className="btn btt-plus" data-toggle="modal" data-target="#modalUser"><i className="fa fa-plus">Create</i> </button>
                        <div className="modal fade" id="modalUser">
                            <div className="modal-dialog modal-sm">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">New User</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="User Name" name="name" value={this.state.name} onChange={e => this.onChange(e)} />
                                            
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-secondary" onClick={() => this.createUser(event)}>Ok</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr bgcolor='#f5f5f5'>
                                <th >Person</th>
                                <th>Date</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.user.map(item => {
                                    return (
                                        <tr className="" key={item} onClick={() => this.chooseUser(item)} >
                                            <td>{item}</td>
                                            <td>7/02/2018</td>
                                            <td><button type="button" className="btn" onClick={e => this.confirmDelCamera(item._id)} ><i className="fa fa-trash-o"></i> </button></td>
                                            <td><button type="button" className="btn" data-toggle="modal" data-target="#modalEditCamera" onClick={e => this.loadCameraById(item._id)}><i className="fa fa-edit"></i> </button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}
export default User
