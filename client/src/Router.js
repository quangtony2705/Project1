import React, { Component } from 'react';
import Login from './components/fLogin';
import Home from './components/fHome';
import Register from './components/fRegister';
import DanhMuc from './components/danhmuc';
import CreateProduct from './components/createProduct';
import Admin from './components/admin';
import User from './components/user';
import fMenu from './components/fMenu';
import Product from './components/product';
import MyProduct from './components/myproduct';
import ProductDetail from './components/productDetail';
import Search from './components/search';
import ThanhToan from './components/thanhtoan';
import {
  Switch,
  Route,
} from 'react-router-dom'
//import UserGroup from './components/UserGroup';

class RouterPage extends Component {
  previousLocation = this.props.location
  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }
  
  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    )
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home}/>
          <Route path="/danhmuc/:type" component={DanhMuc} />
          <Route exact path="/admin" component={Admin}/>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/createProduct" component={CreateProduct} />
          <Route path="/productDetail/:id" component={ProductDetail} />
          <Route path="/fMenu" component={fMenu} />
          <Route path="/user" component={User} />
          <Route path="/search" component={Search} />
          <Route path="/product" component={Product} />
          <Route path="/myproduct" component={MyProduct} />
          <Route path="/thanhtoan" component={ThanhToan} />
        </Switch>
      </div>
    );
  }
}
export default RouterPage