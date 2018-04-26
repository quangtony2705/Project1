import React, { Component } from 'react';
import '../../public/css/style.css'
import Menu from './Menu'
import axios from 'axios';
import Foot from './foot.js';
//import Header from './header';
var Url = window.config.API_URL;

class Product extends Component {
    state = {
        product: [],
        pName: '',
        pStatus: '',
        pPrice: '',
        pType: '',
        key: '',
    }

    componentWillMount() {
        if (localStorage.user === undefined) {
            window.location.href = '/login';
        }
        let that = this
        that.loadProducts();
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    loadProductById(_id) {
        let that = this
        axios.get(Url + 'loadProductById', {
            params: {
                id: _id
            }
        }).then(function (response) {
            that.setState({
                pName: response.data[0].pName,
                pType: response.data[0].pType,
                pStatus: response.data[0].pStatus,
                pPrice: response.data[0].pPrice,
                key: response.data[0]._id
            })
        })
    }
    loadProducts() {
        let that = this
        axios.get(Url + 'loadproduct').then(function (response) {
            that.setState({
                product: response.data,
            });
        })
    }
    updateProduct(e) {
        let that = this
        var payload = {
            "id": this.state.key,
            "pName": this.state.pName,
            "pStatus": this.state.pStatus,
            "pPrice": this.state.pPrice,
            "pType": this.state.pType
        }
        axios.put(Url + 'updateProduct', payload).then(function (response) {
            that.setState({ product: [] })
            that.loadProducts();
        })
    }

    render() {
        return (
            <div id='wrapper'>
                <Menu />
                <div id="page-wrapper">
                    <h1>Product</h1>
                    <table className="table table-hover">
                        <thead>
                            <tr bgcolor='#f5f5f5'>
                                <th>Product Name</th>
                                <th>Product Status</th>
                                <th>Product Price</th>
                                <th>Product Type</th>
                                <th>Owner Product</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.product.map(item => {
                                    return (
                                        <tr className="" key={item._id} >
                                            <td>{item.pName}</td>
                                            <td>{item.pStatus}</td>
                                            <td>{item.pPrice}</td>
                                            <td>{item.pType}</td>
                                            <td>{item.pOwner}</td>
                                            <td><button type="button" className="btn" data-toggle="modal" data-target="#modalEditProduct" onClick={e => this.loadProductById(item._id)}><i className="fa fa-edit"></i> </button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <div className="modal fade" id="modalEditProduct">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Product</h4>
                                </div>
                                <div className="modal-body" key={this.state.key}>
                                    <div className="form-group">
                                        <label>Product name:</label>
                                        <input type="text" readOnly="true" className="form-control" placeholder="pName" name="pName" value={this.state.pName} />
                                    </div>
                                    <div className="form-group">
                                        <label>Product status:</label>
                                        <input type="text" className="form-control" placeholder="pStatus" name="pStatus" value={this.state.pStatus} onChange={e => this.onChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Product Price:</label>
                                        <input type="text" className="form-control" placeholder="price" name="pPrice" value={this.state.pPrice} onChange={e => this.onChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Product Type:</label>
                                        <input type="text" className="form-control" placeholder="type" name="pType" value={this.state.pType} onChange={e => this.onChange(e)} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-secondary" onClick={e => this.updateProduct(e)}>Ok</button>
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
