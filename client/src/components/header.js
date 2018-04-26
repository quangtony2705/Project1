import React, { Component } from 'react';
import '../../public/css/style.css'
//import axios from 'axios';
//var Url = window.config.API_URL;
//import Pagination from "./Pagination";
//import { Table } from 'react-bootstrap';

class header extends Component {
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
        //alert(localStorage.user);

    }
    componentDidMount() {
        if (localStorage.user === undefined) {
            document.getElementById('nav-unuser').style.display = 'block';
            document.getElementById('nav-user').style.display = 'none';
        }
        else {
            document.getElementById('nav-unuser').style.display = 'none';
            document.getElementById('nav-user').style.display = 'block';
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    logout(e) {
        localStorage.setItem("user","");
        document.getElementById('nav-unuser').style.display = 'block';
        document.getElementById('nav-user').style.display = 'none';
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

                            <nav id="nav-unuser" className="top-bar__item top-bar__item--nav navigation navigation--inline pull-right" style={{ borderLeft: '1px solid #dddddd', display: 'block' }}>
                                <ul id="user_info_header" className="navbar-right"><li>
                                    <i className="hd hd-user"></i>
                                    <a rel="nofollow" href="/register">Đăng ký</a></li>
                                    <li>&nbsp; | &nbsp;</li>
                                    <li id="login-popup-header-form" >
                                        <a href="/login" >Đăng nhập</a>

                                    </li>
                                </ul>
                            </nav>

                            <nav id="nav-user" className="top-bar__item top-bar__item--nav navigation navigation--inline pull-right" style={{ borderLeft: '1px solid #dddddd', display: 'none' }}>
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
                                                <a href="/myproduct"><i className="fa  fa-fw"></i> My Products</a>
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
                                        <span className="hotline__number">01697655689</span>                            </a>
                                    </li><li>&nbsp;&nbsp;&nbsp;&nbsp;</li><li>
                                        <a href="#">
                                            <i className="fa fa-question-circle"></i> Hỗ trợ trực tuyến</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>



            </div >
        )
    }
}
export default header;