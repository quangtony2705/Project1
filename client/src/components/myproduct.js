import React, { Component } from 'react';
import '../../public/css/style.css'
import axios from 'axios';
var Url = window.config.API_URL;
import Cart from './cart'
//import Pagination from "./Pagination";
//import { Table } from 'react-bootstrap';

class MyProduct extends Component {
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
    }

    componentWillMount() {
        // if (localStorage.user === undefined) {
        //     window.location.href = '/login';
        // }
        // if(localStorage.user !==undefined){
        //     document.getElementById('nav-user').style.display = 'block';
        //     document.getElementById('nav-unuser').style.display = 'none';
        // }
        this.loadProducts();
    }
    componentDidMount() {
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    logout(e) {
        localStorage.clear();
        document.getElementById('nav-unuser').style.display = 'block';
        document.getElementById('nav-user').style.display = 'none';
    }
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
        axios.get(Url + 'loadProductsByOwner',{
            params: {
                pOwner : localStorage.user
            }
        }).then(function (response) {
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

    delProduct(_id) {
        let that = this
        axios.delete(Url + 'delproduct', {
            params: {
                id: _id
            }
        }).then(function (response) {
            alert(response.data);
            that.setState({ product: [] })
            that.loadProducts();
        })
    }
    confirmDelProduct(key) {
        var retVal = confirm("Do you want to continue ?");
        if (retVal === true) {
            this.delProduct(key)
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        return (
            <div id="hd-container" className="hd-container">
                {/* header top */}
                <div id="top-bar" className="header__top top-bar clearfix">
                    <div className="container">
                        <div className="row">
                            <div className="top-bar__item top-bar__item--area-selector area-selector pull-left">
                                <div className="dropdown">
                                    <form id="formCity" method="post" action="#" className="">
                                        <a href="#" data-toggle="dropdown" aria-expanded="false">
                                            <i className="fa fa-map-marker"></i>&nbsp;&nbsp;<span>Hồ Chí Minh</span>&nbsp;
                                            <i className="fa fa-caret-down"></i>
                                        </a>
                                        <ul id="city-test" className="dropdown-menu dropdown-menu-city">
                                            <li city-code="437"><a href="#"><i className="fa fa-map-marker"></i> Hồ Chí Minh</a></li>
                                            <li city-code="440"><a href="#"><i className="fa fa-map-marker"></i> Hà Nội</a></li>
                                            <li city-code="999999"><a href="#"><i className="fa fa-map-marker"></i> Tỉnh Thành Khác</a>
                                            </li>
                                        </ul>
                                    </form>
                                    <a href="#" className="hidden" id="changeLocation" data-toggle="modal" data-target="#location-selector" data-backdrop="static" data-keyboard="false">
                                        <i className="fa fa-map-marker"></i>&nbsp;
                            <span>Hồ Chí Minh</span>
                                        <i className="fa fa-caret-down"></i>
                                    </a>
                                </div>
                            </div>

                            <div className="top-bar__item top-bar__item--newsletter-link newsletter-link pull-left dropdown group-register-newsletter">
                                <ul className="navbar-center">
                                    <li className="dropdown dropdown-arrow">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="hd hd-newsletter"></i> &nbsp;Đăng ký bản tin</a>

                                    </li>
                                </ul>
                            </div>

                            <nav id="nav-unuser" className="top-bar__item top-bar__item--nav navigation navigation--inline pull-right" style={{ borderLeft: '1px solid #dddddd', display: 'none' }}>
                                <ul id="user_info_header" className="navbar-right"><li>
                                    <i className="hd hd-user"></i>
                                    <a rel="nofollow" href="/register">Đăng ký</a></li>
                                    <li>&nbsp; | &nbsp;</li>
                                    <li id="login-popup-header-form" >
                                        <a href="/login" >Đăng nhập</a>

                                    </li>
                                </ul>
                            </nav>

                            <nav id="nav-user" className="top-bar__item top-bar__item--nav navigation navigation--inline pull-right" style={{ borderLeft: '1px solid #dddddd', display: 'block' }}>
                                <ul className="navbar-right">

                                    <li className="dropdown">
                                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">{localStorage.user}
                                            <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-user">
                                            <li>
                                                <a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                                            </li>
                                            <li>
                                                <a href="/myproduct"><i className="fa fa-user fa-fw"></i> My Products</a>
                                            </li>
                                            <li>
                                                <a href="/createproduct"><i className="fa fa-fw"></i>Create Product</a>
                                            </li>
                                            <li className="divider"></li>
                                            <li>
                                                <a href="#" onClick={e => this.logout(e)}><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>

                            <nav className="top-bar__item top-bar__item--nav navigation navigation--inline pull-right" style={{ 'borderRight': '1px solid #fff' }}>
                                <ul id="user_support" className="navbar-right">
                                    <li><a href="#">
                                        <i className="fa fa-phone"></i> Hotline:&nbsp;
                                        <span className="hotline__number">1900 6760</span>                            </a>
                                    </li><li>&nbsp;&nbsp;&nbsp;&nbsp;</li><li>
                                        <a href="#">
                                            <i className="fa fa-question-circle"></i> Hỗ trợ trực tuyến</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* logo */}
                <div className="header__main  clearfix">
                    <div className="container">
                        <div className="row">
                            <a className="toggle-nav visible-xs visible-sm" data-target="#hd-container" data-effect="hd-effect-4">
                                <i className="hd hd-nav"></i>
                            </a>
                            <a className="toggle-search visible-xs visible-sm" data-target="#main-search">
                                <i className="hd hd-search"></i>
                            </a>

                            <div id="logo" className="logo-wrapper col-md-4">
                                <a href="/">
                                    <img className="hidden-xs hidden-sm logo" style={{ maxHeight: '40px', margin: '-6px 0', width: '200px', height: 'auto' }} src={require('../../public/images/logo.PNG')} alt="logo" />
                                </a>
                            </div>
                            {/* search */}
                            <div style={{ paddingLeft: '10px' }} className="search-area col-md-6 " id="main-search">
                                <form action="#" method="get" className="">
                                    <div className="search-box form-inline clearfix">
                                        <div className="search-box__category">
                                            <select className="selectpicker bs-select-hidden" id="category_search" name="category">
                                                <option value="0">Tất cả danh mục</option>
                                                <option value="557">- Ẩm thực</option>
                                                <option value="579">- Spa &amp; Làm đẹp</option>
                                                <option value="555">- Giải trí</option>
                                                <option value="581">- Du Lịch</option>
                                                <option value="571">- Sản Phẩm</option>
                                                <option value="593">- Thời Trang &amp; Phụ Kiện</option>
                                            </select>
                                            <div className="btn-group bootstrap-select">
                                                <button type="button" className="btn dropdown-toggle btn-default" data-toggle="dropdown" data-id="category_search" title="Tất cả danh mục">
                                                    <span className="filter-option pull-left">Tất cả danh mục</span>&nbsp;
                                        <span className="caret"></span>
                                                </button>
                                                <div className="dropdown-menu open">
                                                    <ul className="dropdown-menu inner" role="menu">
                                                        <li data-original-index="0" className="selected">
                                                            <a tabIndex="0" className="" style={{}} data-tokens="null">
                                                                <span className="text">Tất cả danh mục</span>
                                                                <span className=" fa fa-check check-mark"></span>
                                                            </a>
                                                        </li>
                                                        <li data-original-index="1">
                                                            <a tabIndex="0" className="" style={{}} data-tokens="null">
                                                                <span className="text">- Ẩm thực</span>
                                                                <span className=" fa fa-check check-mark"></span>
                                                            </a>
                                                        </li>
                                                        <li data-original-index="2">
                                                            <a tabIndex="0" className="" style={{}} data-tokens="null">
                                                                <span className="text">- Spa &amp; Làm đẹp</span>
                                                                <span className=" fa fa-check check-mark"></span>
                                                            </a>
                                                        </li>
                                                        <li data-original-index="3">
                                                            <a tabIndex="0" className="" style={{}} data-tokens="null">
                                                                <span className="text">- Giải trí</span>
                                                                <span className=" fa fa-check check-mark"></span>
                                                            </a>
                                                        </li>
                                                        <li data-original-index="4">
                                                            <a tabIndex="0" className="" style={{}} data-tokens="null">
                                                                <span className="text">- Du Lịch</span>
                                                                <span className=" fa fa-check check-mark"></span>
                                                            </a>
                                                        </li>
                                                        <li data-original-index="5">
                                                            <a tabIndex="0" className="" style={{}} data-tokens="null">
                                                                <span className="text">- Sản Phẩm</span>
                                                                <span className=" fa fa-check check-mark"></span>
                                                            </a>
                                                        </li>
                                                        <li data-original-index="6">
                                                            <a tabIndex="0" className="" style={{}} data-tokens="null">
                                                                <span className="text">- Thời Trang &amp; Phụ Kiện</span>
                                                                <span className=" fa fa-check check-mark"></span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="search-box__input" style={{ overflow: 'visible' }}>
                                            <span className="twitter-typeahead" style={{ position: 'relative', display: 'block' }}>
                                                <input type="text" className="form-control input-search tt-hint" value="" readOnly="" autoComplete="off" spellCheck="false" tabIndex="-1" dir="ltr" style={{ position: 'absolute', top: '0px', left: '0px', borderColor: 'transparent', boxShadow: 'none', opacity: '1', background: 'none 0% 0% / auto repeat scroll paddingBox borderBox rgb(255, 255, 255)' }} />
                                                <input type="text" id="search_all" className="form-control input-search tt-input" name="q" placeholder="Tìm kiếm sản phẩm / khuyến mãi" value="" autoComplete="off" spellCheck="false" dir="auto" style={{ position: 'relative', verticalAlign: 'top', backgroundColor: 'transparent' }} />
                                                <pre aria-hidden="true" style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '14px', fontStyle: 'normal', fontVariant: 'normal', fontWeight: '400', wordSpacing: '0px', letterSpacing: '0px', textIndent: '0px', textRendering: 'auto', textTransform: 'none' }}>
                                                </pre>
                                                <div className="tt-menu" style={{ position: 'absolute', top: '100%', left: '0px', zIndex: '100', display: 'none' }}>
                                                    <div className="tt-dataset tt-dataset-search_minimize">
                                                    </div>
                                                </div>
                                            </span>

                                            <a className="btn btn--remove hidden"><i className="hd hd-remove"></i></a>

                                            <a className="btn btn--cancel hidden">Hủy</a>

                                            <button className="btn btn-danger">
                                                <i className="fa fa-search"></i>
                                                <span className="sr-only">Tìm kiếm</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* Cart */}
                            <Cart/>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Product</h1>
                    <table className="table table-hover">
                        <thead>
                            <tr bgcolor='#f5f5f5'>
                                <th>Product Name</th>
                                <th>Product Status</th>
                                <th>Product Price</th>
                                <th>Product Type</th>
                                <th>Update</th>
                                <th>Delete</th>
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
                                            <td><button type="button" className="btn" data-toggle="modal" data-target="#modalEditProduct" onClick={e => this.loadProductById(item._id)}><i className="fa fa-edit"></i> </button></td>
                                            <td><button type="button" className="btn" onClick={e => this.confirmDelProduct(item._id)} ><i className="fa fa-trash-o"></i> </button></td>
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
            </div >
        )
    }
}
export default MyProduct;