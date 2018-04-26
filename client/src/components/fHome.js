import React, { Component } from 'react';
import '../../public/css/style.css'
import axios from 'axios';
import Foot from './foot.js';
import Header from './header';
import Cart from './cart'
var Url = window.config.API_URL;
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            itemsCountPerPage: 12,
            sliceItems: [],
            pageNumber: 1,
            number: '',

            product: [],
            pName: '',
            pStatus: '',
            pPrice: '',
            pType: '',
            productImage: '',
            searchInput: '',
            category: 'all',
            Menu: [],
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }


    componentWillMount() {
        this.loadMenu();
        this.loadProduct();
        this.countProduct();
    }
    // componentDidUpdate(){
    //     this.loadProduct();
    // }
    componentDidMount() {
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleChange = (e) => {
        this.setState({ category: e.target.value });
    }
    countProduct() {
        let that = this
        axios.get(Url + "countProduct").then(function (response) {
            that.setState({
                number: response.data
            })

        })
    }
    loadProduct() {
        let that = this
        axios.get(Url + 'loadproduct').then(function (response) {
            that.setState({
                product: response.data,
                sliceItems: response.data.slice(0, 12),
            });
        })
    }
    loadMenu() {
        let that = this
        axios.get(Url + 'loadMenu').then(function (response) {
            that.setState({
                Menu: response.data
            });
        })
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
    refreshPage = (e) => {
        window.location.reload();
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
                </div >
                {/* ----------------------danh mục -------------------------*/}
                < nav className="header__navigation main-nav" id="main-nav" >
                    <div className="container">
                        <ul className="nav main-nav">
                            <li className="main-nav__branding active">
                                <a className="branding__heading" href="#">
                                    <span className="">Danh mục <i className="fa fa-angle-down"></i></span>
                                </a>
                                <ul className="branding__menu">
                                    {
                                        this.state.Menu.map(item => {
                                            return (

                                                <li className="branding__item branding  multicolumns " key={item._id}>
                                                    <Link to={"/danhmuc" + item.link} >
                                                        <i className="hd hd-khuyen-mai-hot"></i> {item.Name}</Link>
                                                </li>

                                            )
                                        })
                                    }

                                </ul>
                            </li>
                            <li className="hidden-affix ">
                                <a href="/ho-chi-minh/deal-hom-nay/">Deal Mới</a>
                            </li>
                            <li className="hidden-affix ">
                                <a href="/ho-chi-minh/deal-hot/">Deal Bán Chạy</a>
                            </li>
                        </ul>
                    </div>
                </nav >

                {/* -------------------slider bar--------------------------- */}

                < section id="promo-banners" className="clearfix" >
                    <div className="container">
                        <div className="promo-slider">
                            <div className="promo-slider__slides">
                                <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', zIndex: '10' }}></div>
                                <div id="myCarousel" className="carousel slide" data-ride="carousel" style={{ width: '100%', height: '335px' }}>
                                    {/* <!-- Indicators --> */}
                                    <ol className="carousel-indicators">
                                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                        <li data-target="#myCarousel" data-slide-to="1"></li>
                                        <li data-target="#myCarousel" data-slide-to="2"></li>
                                        <li data-target="#myCarousel" data-slide-to="3"></li>
                                    </ol>
                                    {/* <!-- Wrapper for slides --> */}
                                    <div className="carousel-inner" role="listbox" style={{ width: '100%', height: '100%' }}>

                                        <div className="item active">
                                            <img src={require('../../public/images/image1.jpg')} alt="congnghe" style={{ width: '95%', height: '335px' }} />
                                            <div className="carousel-caption">
                                                <h3></h3>
                                                <p></p>
                                            </div>
                                        </div>

                                        <div className="item">
                                            <img src={require('../../public/images/image2.jpg')} alt="mypham" style={{ width: '95%', height: '335px' }} />
                                            <div className="carousel-caption">
                                                <h3></h3>
                                                <p></p>
                                            </div>
                                        </div>

                                        <div className="item">
                                            <img src={require('../../public/images/image3.jpg')} alt="dulich" style={{ width: '95%', height: '335px' }} />
                                            <div className="carousel-caption">
                                                <h3></h3>
                                                <p></p>
                                            </div>
                                        </div>

                                        <div className="item">
                                            <img src={require('../../public/images/image4.jpg')} alt="dulich" style={{ width: '95%', height: '335px' }} />
                                            <div className="carousel-caption">
                                                <h3></h3>
                                                <p></p>
                                            </div>
                                        </div>

                                    </div>


                                    {/* <!-- Left and right controls --> */}
                                    <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev" style={{ width: '5%' }}>
                                        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next" style={{ width: '5%' }}>
                                        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>

                            <div className="promo-banners hidden-sm hidden-xs">
                                <a className="" href="https://www.hotdeal.vn/ho-chi-minh/dealhot/an-uong/dai-tiec-cua/">
                                    <img src={require('../../public/images/ads1.jpg')} alt="" /></a>
                                <a className="" href="https://www.hotdeal.vn/ho-chi-minh/campaign/travel-top-deal-du-lich/">
                                    <img src={require('../../public/images/ads2.jpg')} alt="" /></a>
                                <a className="" href="https://www.hotdeal.vn/ho-chi-minh/dealhot/thoi-trang/fashion-cho-thang-nam-ruc-ro-them-xinh/">
                                    <img src={require('../../public/images/ads3.png')} alt="" /></a>
                                <a className="" href="https://www.hotdeal.vn/tim-kiem?category=571&amp;q=uncle%20bills&amp;field=sell&amp;sort=desc">
                                    <img src={require('../../public/images/ads4.jpg')} alt="" /></a>
                                    
                            </div>
                            <div className="promo-banners-bottom hidden-sm hidden-xs">
                                <div className="promo-banners-bottom-item">
                                    <div>
                                        <a className="" href="https://www.hotdeal.vn/ho-chi-minh/nha-hang-sang-trong/doc-quyen-tat-nien-cuoi-nam-voi-set-menu-nhieu-lua-chon-hap-dan-tai-nh-the-gioi-hai-san-347710.html">
                                            <img src="https://s3-hd.hotdeal.vn/original/2018/1/1/5a615fd1211d5-06bcae5ca81f72f0b047035a2a39596b4fc9f7540cdb9f8c70-pimgpsh-fullsize-distr.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="banner-title">
                                        TG HẢI SẢN                    </div>
                                    {/* <!--<div class="banner-content">
                                            </div>--> */}
                                </div>
                                <div className="promo-banners-bottom-item">
                                    <div>
                                        <a className="" href="https://www.hotdeal.vn/ho-chi-minh/dealhot/an-uong/service-windsor-buffet-cao-cap/">
                                            <img src="https://s3-hd.hotdeal.vn/original/2017/10/2/59f1a51c8d763-41938031748a2082535825ca928005d0ea376adfa9df5d694b-pimgpsh-fullsize-distr.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="banner-title">
                                        WINDSOR                    </div>
                                    {/* <!--<div class="banner-content">
                                            </div>--> */}
                                </div>
                                <div className="promo-banners-bottom-item">
                                    <div>
                                        <a className="" href="https://www.hotdeal.vn/tim-kiem?category=571&amp;q=milaganics&amp;field=sell&amp;sort=desc">
                                            <img src="https://s3-hd.hotdeal.vn/original/2018/1/0/5a4dfc56f137e-120x100-milaganic.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="banner-title">
                                        MILAGANICS                    </div>
                                    {/* <!--<div class="banner-content">
                                            </div>--> */}
                                </div>
                                <div className="promo-banners-bottom-item">
                                    <div>
                                        <a className="" href="https://www.hotdeal.vn/ho-chi-minh/dealhot/an-uong/king-bbq/">
                                            <img src="https://s3-hd.hotdeal.vn/original/2017/12/0/5a24f9fdb2fc1-118f5ae8d8079210cbbdd4aabf4a9ee22f1d6bda6758cecc17-pimgpsh-fullsize-distr.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="banner-title">
                                        KING BBQ                    </div>
                                    {/* <!--<div class="banner-content">
                                            </div>--> */}
                                </div>
                                <div className="promo-banners-bottom-item">
                                    <div>
                                        <a className="" href="https://www.hotdeal.vn/ho-chi-minh/dealhot/thoi-trang/fashion-thoi-trang-an-thuy/">
                                            <img src="https://s3-hd.hotdeal.vn/original/2018/3/1/5aa796c4ce99b-imgpsh-fullsize-1.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="banner-title">
                                        AN THỦY                     </div>
                                    {/* <!--<div class="banner-content">
                                            </div>--> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </section >
                {/* ------------Product------------------ */}
                < main className="main-content clearfix" >
                    <div className="container">
                        <div className="block block--tab tab-style-1">
                            <div className="block__header clearfix bor-tab" >
                                <div className="block__tab">
                                    <ul className="tab nav nav-pills">
                                        <li className="tab__item active">
                                            <a data-toggle="tab" data-url="/ho-chi-minh/deal-noi-bat" data-title="Deal Nổi bật" href="#tab0">Products</a>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                            <div className="block__content tab-content clearfix">
                                <div className="row products">
                                    <div className="products__inner">
                                        {
                                            this.state.sliceItems.map(item => {
                                                var hinh = item.productImage;
                                                return (
                                                    <div key={item._id}>
                                                        <div className="col-md-3 product-wrapper  _tracking" id="product-348630-wrapper">
                                                            <div className="product product-kind-1" data-toggle="box-link" data-url="#" data-category="Deal nổi bật">
                                                                <Link to={"/productDetail/" + item._id}>
                                                                    <div className="product__image">
                                                                        {/* <a href="/productDetail/" > */}
                                                                        <img className="ProductImage lazy b-loaded" width="280px" height="auto" src={require('../../public/uploads/' + hinh)} alt="Buffet " />
                                                                        {/* </a> */}

                                                                        <input type="hidden" value="" style={{ display: 'none' }} />
                                                                        <div className="product__icons bar product__icons_ajax_load_icon" data-product-id="348630" data-category="[139,139,586,586,557,557,1942,1942]" data-feature="[65101]">
                                                                            <img className="icon" src="" alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="product__header">
                                                                        <h3 className="product__title">
                                                                            <p title={item.pName}>{item.pName}</p>
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
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={Number(this.state.number)}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind()}
                        />
                    </div>
                </main >
                <Foot />
            </div >
        )
    }
}
export default Home
