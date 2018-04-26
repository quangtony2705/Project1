import React, { Component } from 'react';
//import '../../public/css/style2.css'
import '../../public/css/style.css'
//import axios from 'axios';
import Menu from './Menu';
import Foot from './foot.js';
//import Header from './header';
//var Url = window.config.API_URL;
//import Pagination from "./Pagination";
//import { Table } from 'react-bootstrap';

class Admin extends Component {
    // constructor (props) {
    //     super(props);
    //    this.handlePageChange = this._handlePageChange.bind(this);
    //     //this.itemofpage=this.items;
    //   }
    state = {
        itemofpage: [],
        activePage: 1,
        itemsCountPerPage: 4,
        sliceItems: [],
        pageNumber: 1,
        product: [],
        pNme: '',
        pStatus: '',
        pPrice: '',
        pType: '',
        productImage: '',
        fileI: [],
        searchInput: '',
    }

    componentWillMount() {
        if (localStorage.user !== "admin") {
            window.location.href = '/login';
        }
        // let that = this
        // axios.get(Url + 'loadproduct').then(function (response) {
        //     that.setState({
        //         product: response.data
        //     });
        // })
    }
    componentDidMount() {
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // clearText(e) {
    //     this.setState({
    //         roomedit: '',
    //         cameraedit: '',
    //         ftpedit: '',
    //         rtspedit: ''
    //     })
    // }
    //room
    // createUser(event) {
    //     var list = this.state.user;
    //     if (this.state.name.length === 0) {
    //         alert('Khong duoc bo trong')
    //     } else {
    //         list.push(this.state.name);
    //     }
    //     this.setState({
    //         user: list
    //     });

    // }




    // handlePageChange(pageNumber) {
    //     this.setState({ activePage: (pageNumber) });
    //     var firstItem = (pageNumber - 1) * this.state.itemsCountPerPage;
    //     var lastItem = firstItem + this.state.itemsCountPerPage;
    //     var slice = this.state.items.slice(firstItem, lastItem);
    //     this.setState({
    //         sliceItems: slice,
    //         pageNumber: pageNumber
    //     })
    //     if (this.state.sliceItems.length < 1) {
    //         firstItem = (pageNumber - 2) * this.state.itemsCountPerPage;
    //         lastItem = firstItem + this.state.itemsCountPerPage;
    //         slice = this.state.items.slice(firstItem, lastItem);
    //         this.setState({
    //             sliceItems: slice,
    //             pageNumber: pageNumber
    //         })
    //         this.setState({ activePage: (pageNumber - 1) });
    //     }
    // }

    render() {
        return (
            <div id="hd-container" className="hd-container">
                <Menu />
                <div id="page-wrapper">
                    <div className="panel-body">
                        <div className='row'>
                            {
                                this.state.product.map(item => {
                                    var hinh = item.productImage;
                                    return (
                                        <div key={item._id}>
                                            <div className="col-sm-3 " data-toggle='box-link' data-url='#'>
                                                <div className="blockProduct">
                                                    <a href='/productDetail'>
                                                        <img src={require('../../public/uploads/' + hinh)} className="img-responsive ProductImage " alt="sanpham" />
                                                        <h2>{item.pNme}</h2>
                                                        <p>{item.pStatus}</p>
                                                        <h3>{item.pPrice}</h3>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
                <Foot />
            </div>
        )
    }
}
export default Admin
