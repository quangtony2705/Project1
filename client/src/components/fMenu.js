import React, { Component } from 'react';
import '../../public/css/style.css'
import Menu from './Menu'
import axios from 'axios';
import Foot from './foot.js';
//import Header from './header';
var Url = window.config.API_URL;

class Product extends Component {
    state = {
        menu: [],
        Name: '',
        link:'',
        key: '',
    }

    componentWillMount() {
        if (localStorage.user === undefined) {
            window.location.href = '/login';
        }
        let that = this
        that.loadMenus();
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    loadMenus() {
        let that = this
        axios.get(Url + 'loadMenu').then(function (response) {
            that.setState({
                menu: response.data,
            });
        })
    }
    createMenu(event) {
        let that = this
        if (this.state.Name.length === 0) {
            alert('name is not emtry')
        }
        else {
            axios.get(Url + 'MenuExist', {
                params: {
                    Name: this.state.Name
                }
            }).then(function (response) {
                if (response.data === 1) {
                    alert('name is exist')
                } else {
                    var payload = {
                        "Name": that.state.Name,
                        "link": that.state.link,
                    }
                    axios.post(Url + 'insertMenu', payload).then(function (response) {
                        that.setState({ menu: [] })
                        that.loadMenus();
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            })
        }
    }
    
    delMenu(_id) {
        let that = this
        axios.delete(Url + 'delMenu', {
            params: {
                id: _id
            }
        }).then(function (response) {
            alert(response.data);
            that.setState({ menu: [] })
            that.loadMenus();
        })
    }
    confirmDelMenu(key) {
        var retVal = confirm("Do you want to continue ?");
        if (retVal === true) {
            this.delMenu(key)
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        return (
            <div id='wrapper'>
                <Menu />
                <div id="page-wrapper">
                    <h1>Menu</h1>
                    <table className="table table-hover">
                        <thead>
                            <tr bgcolor='#f5f5f5'>
                                <th> Name</th>
                                <th> Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.menu.map(item => {
                                    return (
                                        <tr className="" key={item._id} >
                                            <td>{item.Name}</td>
                                            <td><button type="button" className="btn" onClick={e => this.confirmDelMenu(item._id)}><i className="fa fa-trash-o"></i> </button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <button type="button" className="btn" id="btn-panel-footer" data-toggle="modal" data-target="#modalRoom"><i className="fa fa-plus"></i> </button>
                    <div className="modal fade" id="modalRoom">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">New Menu</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="name" name="Name" value={this.state.Name} onChange={e => this.onChange(e)} />
                                        <input type="text" className="form-control" placeholder="link: /name" name="link" value={this.state.link} onChange={e => this.onChange(e)} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => this.createMenu(event)}>Ok</button>
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
export default Product;
