import React, { Component } from 'react';
import '../../public/css/style.css'

const SHOPPING_CART = 'shoppingCart'
const getCart = () => JSON.parse(localStorage.getItem(SHOPPING_CART))
const saveCart = (cart) => localStorage.setItem(SHOPPING_CART, JSON.stringify(cart))
const removeCart = () => localStorage.removeItem(SHOPPING_CART)
const ShoppingCart = {
    getCart,
    saveCart,
    removeCart,
  }

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            pName: '',
            pPrice: '',
            num: 0,
            numberProduct: 0,
            shoppingCart: ShoppingCart.getCart()||[],
        }
    }
    componentDidMount() {
        //lấy data từ localstorage
    }

    removeFromCart = (item) => {
        const { shoppingCart } = this.state
        const newCart = shoppingCart.filter((d) => d._id !== item._id)
        this.setState({ shoppingCart: newCart })
        ShoppingCart.saveCart(newCart)
      }

    render() {
        if(this.state.shoppingCart.length>0){
            const total = this.state.shoppingCart.reduce((p, c) => p + (c.qty * c.pPrice), 0)
            const quality = this.state.shoppingCart.reduce((p, c) => p + c.qty , 0)
        return (
            <div className="col-md-2 header-cart-wrapper ">
                <ul className="header-cart">
                    <li className="nav-cart">
                        <a href="#" data-toggle="dropdown">
                            <i className="hd hd-cart"></i><span className="circle">{quality}</span>
                            <span className="hidden-xs hidden-sm">Giỏ hàng</span>
                        </a>
                        <div className="dropdown-menu dropdown-cart" role="menu">
                            <div className="minicart__wrapper">
                            {
                                this.state.shoppingCart.map(item=>(
                                <div id="minicart__item__348308" className="minicart__item" key={item._id}>
                                    <div className="minicart__item__info">
                                        <div className="minicart__item__name">
                                            <div>
                                                <span>{item.pName}</span>
                                            </div>
                                            <span className="minicart__item__price price">
                                                <span className="price__value">{item.pPrice}</span>
                                                <span className="price__symbol">đ</span>
                                            </span> x {item.qty} = {item.qty*Number(item.pPrice)}
                                    </div>
                                    </div>
                                    <div className="minicart__item__actions">
                                    <span className="btn-close show-on-hover" onClick={() => this.removeFromCart(item)}>X</span>
                                    </div>
                                </div>
                                ))
                            }
                            </div>

                            <div className="minicart__summary">
                                Tổng cộng: <strong>
                                    <span className="price price--highlight">
                                        <span className="price__value">{total}</span>
                                        <span className="price__symbol">đ</span>
                                    </span></strong>
                            </div>
                            <div className="minicart__actions">
                                <a className="btn btn-success btn--buy-now btn--buy-now-new" href="/thanhtoan" rel="nofollow" >Thanh Toán</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }else{
        return(
            <div className="col-md-2 header-cart-wrapper ">
                <ul className="header-cart">
                    <li className="nav-cart">
                        <a href="#" data-toggle="dropdown">
                            <i className="hd hd-cart"></i><span className="circle">0</span>
                            <span className="hidden-xs hidden-sm">Giỏ hàng</span>
                        </a>
                        <div className="dropdown-menu dropdown-cart" role="menu">
                            <div className="minicart__wrapper">
                            </div>

                            <div className="minicart__summary">
                                Tổng cộng: <strong>
                                    <span className="price price--highlight">
                                        <span className="price__value">0</span>
                                        <span className="price__symbol">đ</span>
                                    </span></strong>
                            </div>
                            <div className="minicart__actions">
                                <a className="btn btn-success btn--buy-now btn--buy-now-new" href="/thanhtoan" rel="nofollow" >Thanh Toán</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
    }
}
export default Cart;
