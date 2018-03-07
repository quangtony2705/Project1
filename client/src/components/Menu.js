import React, { Component } from 'react';
import '../../public/css/style.css';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import Test from './Test';
// import User from './user';
//import axios from 'axios';
//var Url = window.config.API_URL;
//import Pagination from "./Pagination";
//import { Table } from 'react-bootstrap';

class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
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
                                <a href="#" className="nav nav-second-level">User Group</a>
                            </span>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Menu