import React, { Component } from 'react';
import '../../public/css/style.css';
import Jumbotron from './jumbotron.js'
class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top" role="navigation">
                <ul className="nav navbar-top-links navbar-right">

                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">{localStorage.user}
                            <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                            </li>
                            <li>
                                <a href="/createproduct"><i className="fa fa-fw"></i>Create Product</a>
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
                                <div className="panel-group">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" href="#collapse1">DashBoard</a>
                                            </h4>
                                        </div>
                                        <div id="collapse1" className="panel-collapse collapse">
                                            <div className="panel-body"><a href="/user">User Management</a></div>
                                            <div className="panel-body"><a href="/product">Product Management</a></div>
                                            <div className="panel-body"><a href="/fMenu">Menu Management</a></div>
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