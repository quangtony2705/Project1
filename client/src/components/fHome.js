import React, { Component } from 'react';
import '../../public/css/style.css'
import axios from 'axios';
import Menu from './Menu';
import Foot from './foot.js';
var Url = window.config.API_URL;
//import Pagination from "./Pagination";
//import { Table } from 'react-bootstrap';

class Home extends Component {
    state = {
        itemofpage: [],
        activePage: 1,
        itemsCountPerPage: 4,
        sliceItems: [],
        pageNumber: 1,
        product: [],
        ten: '',
        trangthai: '',
        gia: '',
        loai: '',
        productImage: '',
        searchInput:'',
    }

    componentWillMount() {
        // if (localStorage.user === undefined) {
        //     window.location.href = '/login';
        // }
        let that = this
        axios.get(Url + 'loadproduct').then(function (response) {
            that.setState({
                product: response.data
            });
        })
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




    handlePageChange(pageNumber) {
        this.setState({ activePage: (pageNumber) });
        var firstItem = (pageNumber - 1) * this.state.itemsCountPerPage;
        var lastItem = firstItem + this.state.itemsCountPerPage;
        var slice = this.state.items.slice(firstItem, lastItem);
        this.setState({
            sliceItems: slice,
            pageNumber: pageNumber
        })
        if (this.state.sliceItems.length < 1) {
            firstItem = (pageNumber - 2) * this.state.itemsCountPerPage;
            lastItem = firstItem + this.state.itemsCountPerPage;
            slice = this.state.items.slice(firstItem, lastItem);
            this.setState({
                sliceItems: slice,
                pageNumber: pageNumber
            })
            this.setState({ activePage: (pageNumber - 1) });
        }
    }
    handleClickTest(event) {
        //let that = this
        var payload = {
            "ten": this.state.ten,
            "trangthai": this.state.trangthai,
            "gia": this.state.gia,
            "loai": this.state.loai,
            "productImage": this.state.productImage
        }
        if (this.state.ten.length === 0) {
            alert("ten không được bỏ trống" + this.state.productImage)
        }
        else if (this.state.trangthai.length === 0) {
            alert("trangthai không được bỏ trống")
        }
        else if (this.state.gia.length === 0) {
            alert("gia không được bỏ trống hoặc Email không đúng")
        }
        else if (this.state.loai.length === 0) {
            alert("loai không được bỏ trống")
        }
        else if (this.state.productImage.length === 0) {
            alert("hình ảnh không được bỏ trống")
        }
        else {
            axios.get(Url + 'productExist', {
                params: {
                    ten: this.state.ten
                }
            }).then(function (response) {
                if (response.data === 1) {
                    alert('tên da ton tai')
                } else {

                    axios.post(Url + 'insertProduct', payload).then(function (response) {
                        if (response.status === 200) {
                            alert("ok");
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
            <div id="wrapper">
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
                                                        <h2>{item.ten}</h2>
                                                        <p>{item.trangthai}</p>
                                                        <h3>{item.gia}</h3>
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
export default Home
