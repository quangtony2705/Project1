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
        pName: '',
        pStatus: '',
        pPrice: '',
        pType: '',
        productImage: '',
        fileI: [],
        pOwner: '',
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
    onChangeCmb = (e) => {
        this.setState({
            pType: e.target.value
        })
    }

    handleChange = (e) => {
        this.setState({ pType: e.target.value });
    }
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
            "pName": this.state.pName,
            "pStatus": this.state.pStatus,
            "pPrice": this.state.pPrice,
            "pType": this.state.pType,
            "productImage": this.state.productImage,
            "pOwner": this.state.pOwner,
        }
        if (this.state.pName.length === 0) {
            alert("Product name is not emtried")
        }
        else if (this.state.pStatus.length === 0) {
            alert("Product status is not emtried")
        }
        else if (this.state.pPrice.length === 0) {
            alert("Product price is not emtried")
        }
        else if (this.state.pType.length === 0) {
            alert("Product type is not emtried")
        } else if (this.state.productImage.length === 0) {
            alert("Product type is not emtried" + this.fileInput.files[0])
        }
        
        else {
            axios.get(Url + 'productExist', {
                params: {
                    pName: this.state.pName
                }
            }).then(function (response) {
                if (response.data === 1) {
                    alert('Product name existed')
                } else {
                    axios.post(Url + 'insertProduct', payload).then(function (response) {
                        if (response.status === 200) {
                            alert(response.data);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            })
        }
    }

    handleChangeAvatar(e)
    {
        this.setState({
            productImage : this.fileInput.files[0]
        })
    }

    render() {
        return (
            <div id="wrapper">
                <Menu />
                <div id="page-wrapper">
                    <div className="panel-body">
                        <form className="form" role="form" encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="email">ten*:</label>
                                <input type="text" className="form-control" name="pName" value={this.state.pName} onChange={e => this.onChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">trangthai*:</label>
                                <input type="text" className="form-control" name="pStatus" value={this.state.pStatus} onChange={e => this.onChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">gia*:</label>
                                <input type="text" className="form-control" name="pPrice" value={this.state.pPrice} onChange={e => this.onChange(e)} />
                            </div>
                            <div className="form-group">
                                <label>Chọn loại:</label>
                                {/* <input type="text" className="form-control" name="pType" value={this.state.pType} onChange={e => this.onChange(e)} /> */}
                                <select className="form-control" value={this.state.pType} onChange={this.handleChange}  >
                                    <option>------</option>
                                    <option value="phone"> Điện Thoại</option>
                                    <option value="computer"> Máy Tính</option>
                                    <option value="domestic" > Du Lịch Trong Nước</option>
                                    <option value="abroad" > Du Lịch Ngoài Nước</option>
                                    <option value="fMale" > Thời Trang Nam </option>
                                    <option value="fFemale" > Thời Trang Nữ</option>
                                    <option value="beauty" > Làm Đẹp </option>
                                    <option value="tool" > Dụng Cụ</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">hình ảnh*:</label>
                                {/* <input
                                    name="productImage"
                                    onChange={this.handleChangeAvatar}
                                    type="file"
                                    className="form-control"
                                    ref={input => {
                                        this.fileInput = input;
                                    }
                                    }
                                /> */}
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
