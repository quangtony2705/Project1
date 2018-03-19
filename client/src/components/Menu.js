import React, { Component } from 'react';
import '../../public/css/style.css';
import Jumbotron from './jumbotron.js'
class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top" role="navigation">
                <div className="navbar-header">
                    <a className="navbar-brand brand-logo" href="/"><img className="logo" src={require('../../public/images/logo.PNG')} alt="logo" /> </a>
                </div>
                <ul className="nav navbar-top-links navbar-right">

                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">{localStorage.user}
                            <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="/login"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <Jumbotron />
                <div className="navbar-default sidebar" role="navigation">
                    <div className="sidebar-nav navbar-collapse">
                        <ul className="nav" id="side-menu">
                            <li className="sidebar-search">
                                <div className="input-group custom-search-form">
                                    <span className="input-group-btn">
                                        <h1>Menu</h1>
                                    </span>
                                </div>
                            </li>
                            <span>
                                <div class="panel-group">
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" href="#collapse1">Công nghệ</a>
                                            </h4>
                                        </div>
                                        <div id="collapse1" class="panel-collapse collapse">
                                            <div class="panel-body"><a href="#">Điện thoại</a></div>
                                            <div class="panel-body"><a href="#">Máy tính</a></div>
                                        </div>
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" href="#collapse2">Du lịch</a>
                                            </h4>
                                        </div>
                                        <div id="collapse2" class="panel-collapse collapse">
                                            <div class="panel-body"><a href="#">Trong nước</a></div>
                                            <div class="panel-body"><a href="#">Ngoài nước</a></div>
                                        </div>
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" href="#collapse3">Thời trang</a>
                                            </h4>
                                        </div>
                                        <div id="collapse3" class="panel-collapse collapse">
                                            <div class="panel-body"><a href="#">Nam</a></div>
                                            <div class="panel-body"><a href="#">Nữ</a></div>
                                        </div>
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" href="#collapse4">Mỹ phẩm</a>
                                            </h4>
                                        </div>
                                        <div id="collapse4" class="panel-collapse collapse">
                                            <div class="panel-body"><a href="#">Làm Đẹp</a></div>
                                            <div class="panel-body"><a href="#">Dụng cụ</a></div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Menu