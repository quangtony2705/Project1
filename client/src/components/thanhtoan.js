import React, { Component } from 'react';
import '../../public/css/style.css'
import axios from 'axios';
import Header from './header';
import Foot from './foot.js';
import Cart from './cart.js';
//import { parse } from 'query-string';
var Url = window.config.API_URL;
import { Link } from "react-router-dom";
//import Pagination from "./Pagination";
//import { Table } from 'react-bootstrap';

const SHOPPING_CART = 'shoppingCart'
const getCart = () => JSON.parse(localStorage.getItem(SHOPPING_CART))
const saveCart = (cart) => localStorage.setItem(SHOPPING_CART, JSON.stringify(cart))
const ShoppingCart = {
    getCart,
    saveCart,
}

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            id: this.props.match.params.id,
            pName: '',
            pStatus: '',
            pPrice: '',
            pType: '',
            productImage: '',
            searchInput: '',
            category: 'all',
            shoppingCart: ShoppingCart.getCart() || [],
            name: '',
            phone: '',
            email:'',
            address: '',
        }
    }
    
    componentWillMount() {
        // const params = new URLSearchParams(this.props.location.search);
        // this.loadProductById(params.get('id'));
        this.loaduserbyName()
    }
    componentDidMount() {
    }
    loaduserbyName() {
        let that = this
        axios.get(Url + 'loaduserbyName', {
            params: {
                name: localStorage.getItem("user"),
            }
        }).then(function (response) {
            that.setState({
                name: response.data[0].username,
                email: response.data[0].email,
                phone: response.data[0].phone,
            })
        })

    }
    saveCart = (cart) => { localStorage.setItem(SHOPPING_CART, JSON.stringify(cart)) }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleChange = (e) => {
        this.setState({ category: e.target.value });
    }

    addToCart = (item) => {
        const { shoppingCart } = this.state
        const isItemExist = shoppingCart.some(({ _id }) => item._id === _id)
        let newCart
        if (isItemExist) {
            newCart = shoppingCart.map(d => {
                if (d._id === item._id) {
                    return {
                        ...d,
                        qty: d.qty + item.qty,
                    }
                }
                return d
            })
        } else {
            newCart = [
                ...shoppingCart,
                item,
            ]
        }
        this.setState({ shoppingCart: newCart })
        ShoppingCart.saveCart(newCart)
        alert("đã thêm vào giỏ hàng");
        this.render();
    }

    // delProduct(_id) {
    //     let that = this
    //     axios.delete(Url + 'delproduct', {
    //         params: {
    //             id: _id
    //         }
    //     }).then(function (response) {
    //         alert(response.data);
    //         that.setState({ product: [] })
    //         that.loadProducts();
    //     })
    // }
    removeFromCart = (id) => {
        const { shoppingCart } = this.state
        const newCart = shoppingCart.filter((d) => d._id !== id)
        this.setState({ shoppingCart: newCart })
        ShoppingCart.saveCart(newCart)
      }
    confirmDelProduct(key) {
        var retVal = confirm("Do you want to continue ?");
        if (retVal === true) {
            this.removeFromCart(key)
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        return (
            <div >
                <Header />
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
                                    <img className="hidden-xs hidden-sm logo" style={{ maxHeight: '60px', margin: '-6px 0', width: '225px', height: 'auto' }} src={require('../../public/images/logo4.png')} alt="logo" />
                                </a>
                            </div>
                            {/* search */}
                            <div style={{ paddingLeft: '10px' }} className="search-area col-md-6 " id="main-search">

                                <div className="search-box form-inline clearfix">
                                    <div className="search-box__category" style={{ height: '100%' }}>
                                        <select className="form-control" value={this.state.category} onChange={this.handleChange} style={{ height: '100%', width: '100%' }}  >
                                            <option value="all"> tất cả danh mục</option>
                                            <option value="amthuc"> Ẩm thực</option>
                                            <option value="spa" > Spa &amp; Làm đẹp</option>
                                            <option value="giaitri" > Giải trí</option>
                                            <option value="dulich" > Du Lịch </option>
                                            <option value="phukien" > Thiết bị và phụ kiện</option>
                                            <option value="mevabe" > Mẹ và bé</option>
                                            <option value="thucpham" > Thực Phẩm</option>
                                            <option value="suckhoe" > Sức khỏe và sắc đẹp</option>
                                            <option value="nhacua" > Nhà cửa và đời sống</option>
                                            <option value="thoitrang" > Thời Trang &amp; Phụ Kiện</option>
                                            <option value="sukien" >Vé sự kiện</option>
                                        </select>

                                    </div>
                                    <div className="search-box__input" style={{ overflow: 'visible', width: '350px' }}>
                                        <span className="twitter-typeahead" style={{ position: 'relative', display: 'block', width: '350px' }}>
                                            {/* //<input type="text" className="form-control input-search tt-hint" value="" readOnly="" autoComplete="off" spellCheck="false" tabIndex="-1" dir="ltr" style={{ position: 'absolute', top: '0px', left: '0px', borderColor: 'transparent', boxShadow: 'none', opacity: '1', background: 'none 0% 0% / auto repeat scroll paddingBox borderBox rgb(255, 255, 255)' }} /> */}
                                            <input type="text" id="search_all" className="form-control input-search tt-input" name="searchInput" placeholder="Tìm kiếm sản phẩm / khuyến mãi" value={this.state.searchInput} onChange={e => this.onChange(e)} style={{ position: 'relative', verticalAlign: 'top', backgroundColor: 'transparent' }} />
                                            <pre aria-hidden="true" style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '14px', fontStyle: 'normal', fontVariant: 'normal', fontWeight: '400', wordSpacing: '0px', letterSpacing: '0px', textIndent: '0px', textRendering: 'auto', textTransform: 'none' }}>
                                            </pre>
                                            <div className="tt-menu" style={{ position: 'absolute', top: '100%', left: '0px', zIndex: '100', display: 'none' }}>
                                                <div className="tt-dataset tt-dataset-search_minimize">
                                                </div>
                                            </div>
                                        </span>

                                    </div>
                                    <Link to={"/search?category=" + this.state.category + "&key=" + this.state.searchInput} style={{ position: 'absolute', marginLeft: '345px', height: '100%' }} >
                                        <button className="btn btn-danger" style={{ height: '100%', width: '56px' }}>
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </Link>
                                </div>

                            </div>
                            {/* Cart */}
                            <Cart />
                            

                        </div>
                    </div>
                </div>
                {/* -------------container----------- */}

                <main className="mainPro-content clearfix">
                    <div className="panel-body">
                        <form className="form" role="form" >
                            <div className="form-group">
                                <label htmlFor="email">Tên*:</label>
                                <input type="text" className="form-control" name="name" value={this.state.name} onChange={e => this.onChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Email*:</label>
                                <input type="text" className="form-control" name="email" value={this.state.email} onChange={e => this.onChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">số SDT*:</label>
                                <input type="text" className="form-control" name="phone" value={this.state.phone} onChange={e => this.onChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Địa chỉ giao hàng*:</label>
                                <input type="text" className="form-control" name="address" value={this.state.address} onChange={e => this.onChange(e)} />
                            </div>

                            <table className="table table-hover">
                                <thead>
                                    <tr bgcolor='#f5f5f5'>
                                        <th>Tên sản phẩm</th>
                                        <th>giá tiền</th>
                                        <th>số lượng</th>
                                        <th>tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.shoppingCart.map(item => {
                                            return (
                                                <tr className="" key={item._id} >
                                                    <td>{item.pName}</td>
                                                    <td>{item.pPrice}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.qty * item.pPrice}</td>
                                                    <td><button type="button" className="btn" onClick={e => this.confirmDelProduct(item._id)} ><i className="fa fa-trash-o"></i> </button></td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>

                            <button type="button" className="btn btn-defaul float-right" id="btntest" onClick={() => this.handleClickTest(event)}>Thanh Toán</button>
                        </form>
                    </div>
                </main>
                <Foot />
            </div>
        )
    }
}
export default ProductDetail;