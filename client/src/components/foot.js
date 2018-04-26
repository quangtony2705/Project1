import React, { Component } from 'react';
import '../../public/css/style.css';
class Foot extends Component {
    render() {
        return (
            <footer className="footer-new clearfix">
                <div className="footer-communication">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-md-6 news-letter hidden-sm hidden-xs">
                                        <form action="#" method="post" data-toggle="validator" noValidate="novalidate" className="fv-form fv-form-bootstrap">
                                        <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: '0px', height: '0px'}}>
                                        </button>
                                            <label>Đăng ký nhận bản tin khuyến mãi</label>
                                            <div className="newsletter form-inline">
                                                <div className="form-group has-feedback">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control newsletter-input" name="email_newsletter" placeholder="Nhập email của bạn" value="" data-fv-notempty="true" data-fv-notempty-message="Vui lòng nhập Email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" data-fv-regexp-message="Email không hợp lệ" data-fv-field="email_newsletter" />
                                                        <input type="hidden" name="stateId" value="437" />
                                                    </div><i className="form-control-feedback fv-icon-no-label fv-bootstrap-icon-input-group" data-fv-icon-for="email_newsletter" style={{display: 'none'}}></i>
                                                    <small className="help-block" data-fv-validator="notEmpty" data-fv-for="email_newsletter" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Vui lòng nhập Email</small>
                                                    <small className="help-block" data-fv-validator="regexp" data-fv-for="email_newsletter" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Email không hợp lệ</small></div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <button type="submit" className="btn btn-success newsletter__button" disabled="">Đăng ký
                                                </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <label htmlFor="" className="control-label register-new-letter-comfirm-footer" style={{fontWeight: 'normal'}}>
                                                <input type="checkbox" name="agree" id="agree" value="1" data-fv-notempty="true" data-fv-notempty-message="Bạn cần phải đồng ý với chính sách bảo mật thông tin" data-fv-field="agree" />
                                                <i className="form-control-feedback fv-icon-no-label" data-fv-icon-for="agree" style={{display: 'none'}}></i>
                                                Đồng ý với <a target="_blank" href="https://www.hotdeal.vn/chinh-sach-bao-mat-thong-tin.html">chính sách bảo mật thông tin</a>.
                                    </label>
                                        </form>
                                        <small className="help-block" data-fv-validator="notEmpty" data-fv-for="agree" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Bạn cần phải đồng ý với chính sách bảo mật thông tin</small>
                                    </div>
                                    <div className="col-md-6 app-store">
                                        <label>Web app</label>
                                        <div className="content-app">
                                            <span>
                                                <a target="_blank" href="https://itunes.apple.com/vn/app/hotdeal.vn-cung-mua-chung/id1072313541?mt=8" rel="nofollow">
                                                    <img src="https://s3-hd.hotdeal.vn/original/2017/11/2/5a13d8cc6385a-icon-appstore.png" alt=""/>
                                                </a>
                                            </span>
                                            <span><a target="_blank" href="https://play.google.com/store/apps/details?id=com.hotdealvn.hotdealapp" rel="nofollow">
                                                <img src="https://s3-hd.hotdeal.vn/original/2017/11/2/5a13d8cc639d2-icon-googleplay.png" alt="" />
                                            </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="row">
                                    <div className="col-md-6 social">
                                        <label>follow us</label>
                                        <div className="social-items">
                                            <a target="_blank" className="social-item social-item-facebook" href="https://www.facebook.com/Hotdeal.hochiminh" rel="nofollow">
                                                <i className="fa fa-facebook"></i></a>
                                            <a target="_blank" className="social-item social-item-twitter" href="https://twitter.com/HotdealVietnam" rel="nofollow">
                                                <i className="fa fa-twitter"></i></a>
                                            <a target="_blank" className="social-item social-item-google-plus" href="https://plus.google.com/+hotdeal/" rel="nofollow">
                                                <i className="fa fa-google-plus"></i></a>
                                            <a target="_blank" className="social-item social-item-linkedin" href="https://www.linkedin.com/company/hotdeal.vn" rel="nofollow">
                                                <i className="fa fa-linkedin"></i></a>
                                            <a target="_blank" className="social-item social-item-youtube" href="https://www.youtube.com/user/HotdealVietnam" rel="nofollow">
                                                <i className="fa fa-youtube"></i></a>
                                        </div>
                                    </div>
                                    <div className="col-md-6 hidden-xs">
                                        <div className="hot-line">
                                            hotline <span>01697655689</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-middle hidden-xs">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="redit-card">
                                    <p>phương thức thanh toán</p>
                                    <img src="https://s3-hd.hotdeal.vn/original/2017/11/1/5a0a64b85c310-card-visa.png" alt=""/>
                                    <img src="https://s3-hd.hotdeal.vn/original/2017/11/1/5a0a64b85c007-card-master.png" alt=""/>
                                    <img src="https://s3-hd.hotdeal.vn/original/2017/11/1/5a0a64b85c20d-card-onepay.png" alt=""/>
                                    <img src="https://s3-hd.hotdeal.vn/original/2017/11/1/5a0a64b85bde6-card-atm.png" alt=""/>
                                    <img src="https://s3-hd.hotdeal.vn/original/2017/11/1/5a0a64b85c115-card-money.png" alt=""/>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="logo-shiper">
                                    <p>dịch vụ giao hàng</p>
                                    <img src="https://s3-hd.hotdeal.vn/original/2017/11/1/5a0a67c9ed7ca-logo-hotdeal-express.png" alt=""/>
                                    <img src="https://s3-hd.hotdeal.vn/original/2017/11/1/5a0a67c9ed640-logo-giao-hang-nhanh.png" alt=""/>
                                    <img src="https://s3-hd.hotdeal.vn/original/2017/11/1/5a0a67c9ed8e9-logo-vietnam-post.png" alt=""/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="logo-shiper">
                                    <p>website cùng hệ thống</p>
                                    <a href="https://www.vinabook.com/?utm_campaign=logotaihotdeal&amp;utm_medium=logo&amp;utm_source=hotdeal&amp;utm_content=logo" target="_blank">
                                        <img src="https://s3-hd.hotdeal.vn/original/2017/11/1/5a0a697ea03cc-logo-vinabook.png" alt=""/></a>
                                    <a href="https://www.yesgo.vn/?utm_campaign=logotaihotdeal&amp;utm_medium=logo&amp;utm_source=hotdeal&amp;utm_content=logo" target="_blank">
                                        <img src="https://s3-hd.hotdeal.vn/original/2017/11/1/5a0a697ea0548-logo-yesgo.png" alt=""/></a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Foot;