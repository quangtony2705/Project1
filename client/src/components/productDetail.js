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
        }
    }
    componentDidUpdate() {
        this.loadProductById(this.state.id)
    }

    componentWillMount() {
        // const params = new URLSearchParams(this.props.location.search);
        // this.loadProductById(params.get('id'));
        this.loadProductById(this.state.id)
    }
    componentDidMount() {
    }
    loadProductById(pId) {
        let that = this
        axios.get(Url + 'loadProductById', {
            params: {
                id: pId,
            }
        }).then(function (response) {
            that.setState({
                product: response.data,
                // pName: response.data[0].pName,
                // pPrice: response.data[0].pPrice,
                // pType: response.data[0].pType,
                // productImage: response.data[0].productImage,
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
    // addToCart() {
    //     var stored = [];
    //     if (sessionStorage.product !== undefined) {
    //         var retrievedObject = localStorage.getItem("product");
    //         stored = JSON.parse(retrievedObject);
    //         var pro = this.state.product[0];
    //         stored.push(pro);
    //         localStorage.setItem('product', JSON.stringify(stored));
    //         console.log(JSON.stringify(stored))
    //         console.log("co roi");
    //     } else {
    //         pro = this.state.product[0];
    //         //var stored = Object.assign(stored, pro);
    //         localStorage.setItem('product', JSON.stringify(pro));
    //         console.log(localStorage.product)
    //         console.log("chua co");
    //     }
    // }
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
                            <Cart/>
                            {/* <div className="col-md-2 header-cart-wrapper ">
                                <ul className="header-cart">
                                    <li className="nav-cart">
                                        <a href="#" data-toggle="dropdown">
                                            <i className="hd hd-cart"></i><span className="circle">0</span>
                                            <span className="hidden-xs hidden-sm">Giỏ hàng</span></a>
                                        <div className="dropdown-menu dropdown-cart" role="menu">
                                            <div className="minicart__wrapper"></div>

                                            <div className="minicart__summary">
                                                Tổng cộng: <strong>
                                                    <span className="price price--highlight">
                                                        <span className="price__value">0</span>
                                                        <span className="price__symbol">đ</span>
                                                    </span></strong>
                                            </div>
                                            <div className="minicart__actions">
                                                <a className="btn btn--view-cart" href="#" rel="nofollow" disabled="disabled">Xem giỏ hàng</a>
                                                <a className="btn btn-success btn--buy-now btn--buy-now-new" href="#" rel="nofollow" disabled="disabled">Đặt hàng</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div> */}

                        </div>
                    </div>
                </div>
                {/* -------------container----------- */}

                <main className="mainPro-content clearfix">
                    {
                        this.state.product.map(item => {
                            var hinh = item.productImage;
                            return (
                                <div className="container" key={item._id}>
                                    <div className="product product--details clearfix">
                                        <div id="product-gallery-105983" className="product__gallery gallery " data-max-thumbs="5">
                                            <div className="gallery__image media-gallery owl-carousel owl-theme" style={{ opacity: '1', display: 'block' }}>
                                                <div className="owl-wrapper-outer">
                                                    <div className="owl-wrapper" style={{ width: '7200px', left: '0px', display: 'block', transition: 'all 400ms ease', transform: 'translate3d(0px, 0px, 0px)' }}>
                                                        <div className="owl-item active" style={{ width: '400px' }}>
                                                            <a href="#" className="">
                                                                <img width="400px" height="400px" style={{ maxWidth: '100%' }} src={require('../../public/uploads/' + hinh)} alt="" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product__details">
                                            <div className="product__header">
                                                <h1 className="product__title" >{item.pName}</h1>


                                                {/* <div className="product__sharing sharing">
                                        <div className="sharing__item" style={{ marginRight: '10px' }}>
                                            <div className="fb-like fb_iframe_widget" data-href="#">
                                                <span style={{ verticalAlign: 'bottom', width: '68px', height: '20px' }}>
                                                    <iframe name="f161283bd765358" width="1000px" height="1000px" frameBorder="0" allowTransparency="true" allowFullScreen="true" scrolling="no" title="fb:like Facebook Social Plugin" src="#" style={{ border: 'none', visibility: 'visible', width: '68px', height: '20px' }} className="">
                                                    </iframe>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="sharing__item">
                                            <div id="___plusone_0" style={{ textIndent: '0px', margin: '0px', padding: '0px', background: 'transparent', borderStyle: 'none', float: 'none', lineHeight: 'normal', fontSize: '1px', verticalAlign: 'baseline', display: 'inline-block', width: '38px', height: '24px' }}>
                                                <iframe ng-non-bindable="" frameBorder="0" hspace="0" marginHeight="0px" marginWidth="0px" scrolling="no" style={{ position: 'static', top: '0px', width: '38px', margin: '0px', borderStyle: 'none', left: '0px', visibility: 'visible', height: '24px' }} tabIndex="0" vspace="0" width="100%" id="I0_1522745078212" name="I0_1522745078212" src="" data-gapiattached="true" title="G+">
                                                </iframe>
                                            </div>
                                        </div>
                                        <div className="sharing__item" tabIndex="1000">
                                            <a className="pull-right share addthis_button_compact" href="#">
                                                <i className="hd hd-share">
                                                </i> Chia sẻ</a>
                                        </div>
                                    </div> */}
                                            </div>

                                            <div className="product__description" style={{ borderBottom: '1px solid #eaeaea', padding: '10px' }}>
                                                <p>Ốp Lưng Giả Jean Cho Iphone 6 – Kiểu Dáng Bụi Bặm, Cá Tính – Vừa Bảo Vệ Dế Yêu Vừa Thể Hiện Đẳng Cấp Người Sử Dụng. Giá 170.000 VNĐ, Còn 99.000 VNĐ, Giảm 42%. Chỉ Có Tại Hotdeal.vn!</p>
                                            </div>

                                            <div className="product__price-info clearfix">
                                                <div className="box-price-detail">



                                                    <div className="product__price _product_price" >

                                                        <meta itemProp="priceCurrency" content="VND" />
                                                        <span className="price">
                                                            <span className="price__value" itemProp="price">{item.pPrice}</span><span className="price__symbol">đ</span>
                                                            <input type="hidden" name="variants[105983][price]" id="price_105983" value="99000" />
                                                            <span className="price__discount">-42%</span>
                                                        </span>
                                                    </div>

                                                    <div className="product__icons bar product__icons_ajax_load_icon icon-deal-detail" data-product-id="105983" data-category="[717,710,720,722,723,741,725,735,733,743,748,571,1932,2279,2330,588]">
                                                        <img className="icon" src="" alt="" />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="product__add-to-cart border-top clearfix">
                                                <div className="add-to-cart__actions add-to-cart-buttons">
                                                    <button id="btn--buy-now" onClick={() => this.onChange()} className="btn btn-success btn--buy-now btn--buy-now-x2">
                                                        MUA NGAY <i className="fa fa-long-arrow-right"></i>
                                                    </button>
                                                    <button id="add-to-cart" className="btn btn-default btn--add-to-cart" onClick={() => this.addToCart({...item,qty:1})}>
                                                        <i className="hd hd-cart"></i> THÊM VÀO GIỎ HÀNG
                                                    </button>
                                                </div>

                                            </div>

                                            <div className="product__stats border-top">
                                                <div className="product__purchases">
                                                    <i className="fa fa-user"></i> 72                            đã mua
                                    </div>

                                            </div>

                                            <div className="product__delivery border-top">
                                                <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Giao sản phẩm tận nơi">
                                                    <i className="hd hd-shipping"></i> Giao sản phẩm &nbsp; &nbsp;</span>

                                                <span style={{ color: '#5a8c19' }} data-toggle="tooltip" data-placement="top" title="" data-original-title="Giao hàng miễn phí cho cho đơn hàng từ 150,000đ trở lên và có địa chỉ tại nội thành TP.HCM.">
                                                    <i className="fa fa-truck" style={{ color: '#71be0f' }}></i>

                                                    Giao hàng miễn phí tại Hà Nội và TP.HCM cho đơn hàng từ 150,000đ</span>
                                            </div>


                                        </div>
                                    </div>
                                    {/* ------------decription--------------- */}
                                    <div id="decrip" className="well product-well hidden-sm hidden-xs expanded">
                                        <div className="row">
                                            <div className="col-md-6" style={{ paddingRight: '20px' }}>
                                                <h3 className="product-well-title">Điểm nổi bật</h3>

                                                <div className="wysiwyg">
                                                    <p>- Ốp lưng giả jean cho iPhone 6 được thiết kế với kiểu dáng bụi bặm, cá tính, vừa giúp bảo vệ iPhone vừa thể hiện đẳng cấp người sử dụng.</p>
                                                    <p>- Chất liệu nhựa cao cấp, bền đẹp, cho thời hạn sử dụng dài lâu.</p>
                                                    <p>- Thiết kế thông minh với các lỗ camera, đèn, tai nghe… được cắt rỗng chính xác, sắc xảo đến từng chi tiết.</p>
                                                    <p>- Sản phẩm có nhiều họa tiết độc đáo: Túi sau, túi trước, wax rách, dây kéo cho bạn lựa chọn phù hợp với sở thích.</p>
                                                    <p>- Cách sử dụng dễ dàng, chỉ cần bọc ngoài iPhone là có thể bảo vệ dế yêu của bạn khỏi những trầy xước không đáng có do va chạm, giữ cho điện thoại luôn bền đẹp như mới.</p>                        </div>
                                            </div>
                                            <div className="col-md-6" style={{ paddingLeft: '20px' }}>
                                                <h3 className="product-well-title">Điều kiện sử dụng</h3>

                                                <div className="wysiwyg">
                                                    <p><strong>- Hotdeal giao sản phẩm theo họa tiết đến tận tay khách hàng.</strong></p>
                                                    <p>+ Đối với khu vực TP.HCM: Miễn phí.</p>
                                                    <p>+ Đối với các tỉnh thành khác: Chuyển phát nhanh theo phí bưu điện.</p>
                                                    <p><strong>- Áp dụng cho Ốp lưng giả jean cho iphone 6.</strong></p>
                                                    <p><strong>- Họa tiết: Túi sau, túi trước, wax rách, dây kéo.</strong></p>
                                                    <p><strong>- Kích thước: 13.7 x 6 x 0.5 cm</strong></p>
                                                    <p>- Hotdeal không giao sản phẩm ngày chủ nhật.</p>
                                                    <p>- Khách hàng không bù thêm tiền khi nhận sản phẩm.</p>
                                                    <p>- Khách hàng vui lòng kiểm tra sản phẩm trước khi nhận hàng, Hotdeal không chịu trách nhiệm đổi trả sản phẩm sau khi giao hàng.</p>                        </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </main>
                <Foot />
            </div>
        )
    }
}
export default ProductDetail;