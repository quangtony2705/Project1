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
        gia:'',
        loai:'',
        productImage: '',
    }

    componentWillMount() {
        // if (localStorage.user === undefined) {
        //     window.location.href = '/login';
        // }
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
          alert("ten không được bỏ trống" +this.state.productImage)
        }
        else if (this.state.trangthai.length === 0) {
          alert("trangthai không được bỏ trống")
        }
        else if (this.state.gia.length === 0 ) {
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
                        <form className="form" role="form">
                            <div className="form-group">
                                <label htmlFor="email">ten*:</label>
                                <input type="text" className="form-control" name="ten" value={this.state.ten} onChange={e => this.onChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">trangthai*:</label>
                                <input type="text" className="form-control" name="trangthai" value={this.state.trangthai} onChange={e => this.onChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">gia*:</label>
                                <input type="text" className="form-control" name="gia" value={this.state.gia} onChange={e => this.onChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">loai*:</label>
                                <input type="text" className="form-control" name="loai" value={this.state.loai} onChange={e => this.onChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">hình ảnh*:</label>
                                <input type="file" className="form-control" name="productImage" value={this.state.productImage} onChange={e => this.onChange(e)} />
                            </div>
                            <button type="button" className="btn btn-defaul float-right" id="btntest" onClick={() => this.handleClickTest(event)}>Create</button>
                        </form>
                    </div>
                </div>
                <Foot />
            </div>
        )
    }
}
export default Home
