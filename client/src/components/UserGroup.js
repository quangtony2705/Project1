import React, { Component } from 'react';
import '../../public/css/style.css'
//import axios from 'axios';
import Menu from './Menu'
//var Url = window.config.API_URL;
//import Pagination from "./Pagination";
//import { Table } from 'react-bootstrap';

class UserGroup extends Component {
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
    
    render() {
        return (
            <div id='wrapper'>
            <Menu/>
            <div id="page-wrapper">
                <a href="/" className='btt-info btt-Right link-back'><i className="fa fa-sign-out fa-fw"></i> Quay lại</a>
                <h1>User Group</h1>
                <div>
                    <table className="table table-hover">
                        <thead>
                            <tr bgcolor='#f5f5f5'>
                                <th >Person</th>
                                <th>Add</th>
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
                                            <td><input type='checkbox' name='check' value={'Add'} onClick={e => this.checkbox(e)} /></td>
                                            <td><input type='checkbox' name='check' value={'Delete'} onClick={e => this.checkbox(e)} /></td>
                                            <td><input type='checkbox' name='check' value={'Update'} onClick={e => this.checkbox(e)} /></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        )
    }
}
export default UserGroup
