import React, { Component } from 'react';
import '../../public/css/style.css'
import axios from 'axios';
import Header from './header';
import Foot from './foot.js';
//import { parse } from 'query-string';
var Url = window.config.API_URL;
import { Link } from "react-router-dom";
//import Pagination from "./Pagination";
//import { Table } from 'react-bootstrap';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            itemsCountPerPage: 12,
            sliceItems: [],
            pageNumber: 1,
            number: '',

            product: [],
            id: '',
            pName: '',
            pStatus: '',
            pPrice: '',
            pType: '',
            productImage: '',
            searchInput: '',
            category: 'all',
            key: '',
            message: '',
        }
    }

    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);
        //var catag = params.get('catagory');
        //var key =  params.get('key');
        //alert(catag+"++"+key);
        this.loadProductById(params.get('category'), params.get('key'));
    }
    componentDidMount() {
    }

    loadProductById(catag, text) {
        let that = this
        axios.get(Url + 'searchproduct', {
            params: {
                pType: catag,
                pName: text,
            }
        }).then(function (response) {
            if (response.data.length === 0) {
                that.setState({
                    message: 'Không tìm thấy sản phẩm',
                })
            }
            else {
                that.setState({
                    product: response.data,
                    sliceItems: response.data,
                    number: response.data.length,
                    message:'',
                })
            }
        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidUpdate(){
        const params = new URLSearchParams(this.props.location.search);
        this.loadProductById(params.get('category'), params.get('key'));
    }
    handleChange = (e) => {
        this.setState({ category: e.target.value });
    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: (pageNumber) });
        var firstItem = (pageNumber - 1) * this.state.itemsCountPerPage;
        var lastItem = firstItem + this.state.itemsCountPerPage;
        var slice = this.state.product.slice(firstItem, lastItem);
        this.setState({
            sliceItems: slice,
            pageNumber: pageNumber
        })
        if (this.state.sliceItems.length < 1) {
            firstItem = (pageNumber - 2) * this.state.itemsCountPerPage;
            lastItem = firstItem + this.state.itemsCountPerPage;
            slice = this.state.product.slice(firstItem, lastItem);
            this.setState({
                sliceItems: slice,
                pageNumber: pageNumber
            })
            this.setState({ activePage: (pageNumber - 1) });
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
                                    <Link to={"/search?category="+this.state.category+"&key="+this.state.searchInput} style={{ position: 'absolute', marginLeft: '345px', height: '100%' }} >
                                        <button className="btn btn-danger" style={{ height: '100%', width: '56px' }}>
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </Link>
                                </div>

                            </div>
                            {/* Cart */}
                            <div className="col-md-2 header-cart-wrapper ">
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
                            </div>

                        </div>
                    </div>
                </div>
                {/* -------------container----------- */}

                < main className="main-content clearfix" style={{paddingTop:'0px'}}>
                    <div className="container">
                        <div className="block block--tab tab-style-1">
                            <div className="block__content tab-content clearfix">
                                <div className="row products">
                                    <div className="products__inner">
                                        <h1>{this.state.message}</h1>
                                        {
                                            this.state.product.map(item => {
                                                var hinh = item.productImage;
                                                return (
                                                    <div className="col-md-3 product-wrapper  _tracking" id="product-348630-wrapper" key={item._id}>
                                                        <div className="product product-kind-1" id="product-348630" itemScope="" itemType="http://schema.org/Product" data-toggle="box-link" data-url="" data-category="Deal nổi bật">
                                                            <Link to={"/productDetail/"+item._id}>
                                                                <div className="product__image">
                                                                    <a href="#" title="Buffet Tối Sang Trọng Thứ 2 Đến Thứ 5 Tại Liberty City Point 4* Hotel">
                                                                        <img itemProp="image" className="ProductImage lazy b-loaded" width="280px" height="auto" src={require('../../public/uploads/' + hinh)} alt="Buffet " />
                                                                    </a>

                                                                    <input type="hidden" value="" style={{ display: 'none' }} />
                                                                    <div className="product__icons bar product__icons_ajax_load_icon" data-product-id="348630" data-category="[139,139,586,586,557,557,1942,1942]" data-feature="[65101]">
                                                                        <img className="icon" src="" alt="" />
                                                                    </div>
                                                                </div>
                                                                <div className="product__header">
                                                                    <h3 className="product__title">
                                                                        <a href="#" itemProp="name" title="Buffet ">{item.pName}</a>
                                                                        <meta itemProp="brand" content="" />
                                                                    </h3>
                                                                </div>
                                                                <div className="product__info">
                                                                    <div className="product__price _product_price" itemProp="offers" itemScope="" itemType="http://schema.org/Offer">
                                                                        <meta itemProp="priceCurrency" content="VND" />
                                                                        <span className="price">
                                                                            <span className="price__value" itemProp="price">{item.pPrice}</span>
                                                                            <span className="price__symbol">đ</span>
                                                                        </span>
                                                                    </div>

                                                                    <div className="product__stats">
                                                                        <div className="product__rating rating" itemProp="aggregateRating" itemScope="" itemType="http://schema.org/AggregateRating">
                                                                            <meta itemProp="worstRating" content="0" />
                                                                            <meta itemProp="bestRating" content="5" />
                                                                            <meta itemProp="ratingValue" content="0" />
                                                                            <meta itemProp="ratingCount" content="0" />
                                                                            <div className="stars">
                                                                                <div className="stars">
                                                                                    <span className="stars__star star star--off">
                                                                                        <i className="hd hd-star"></i></span>
                                                                                    <span className="stars__star star star--off">
                                                                                        <i className="hd hd-star"></i></span>
                                                                                    <span className="stars__star star star--off">
                                                                                        <i className="hd hd-star"></i></span>
                                                                                    <span className="stars__star star star--off">
                                                                                        <i className="hd hd-star"></i></span>
                                                                                    <span className="stars__star star star--off">
                                                                                        <i className="hd hd-star"></i></span>
                                                                                </div>
                                                                            </div>
                                                                            <span className="vote-count"><span>(</span>0<span>)</span></span>
                                                                        </div>
                                                                        <div className="product__views">
                                                                            <i className="fa fa-user"></i> 1,834                </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={Number(this.state.number)}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind()}
                    /> */}
                </main>
                <Foot />
            </div>
        )
    }
}
export default ProductDetail;