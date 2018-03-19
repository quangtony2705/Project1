import React, { Component } from 'react';
import '../../public/css/style.css';
class Jumbotron extends Component {
    render() {
        return (
            <div className="jumbotron jum" role="navigation">
                <div className="container text-center jum">
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        {/* <!-- Indicators --> */}
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                            <li data-target="#myCarousel" data-slide-to="3"></li>
                        </ol>
                        {/* <!-- Wrapper for slides --> */}
                        <div className="carousel-inner" role="listbox">

                            <div className="item active">
                                <img src={require('../../public/images/image1.jpg')} alt="congnghe" width="260" height="445" />
                                <div className="carousel-caption">
                                    <h3></h3>
                                    <p></p>
                                </div>
                            </div>

                            <div className="item">
                                <img src={require('../../public/images/image2.jpg')} alt="mypham" width="260" height="445" />
                                <div className="carousel-caption">
                                    <h3></h3>
                                    <p></p>
                                </div>
                            </div>

                            <div className="item">
                                <img src={require('../../public/images/image3.jpg')} alt="dulich" width="260" height="445" />
                                <div className="carousel-caption">
                                    <h3></h3>
                                    <p></p>
                                </div>
                            </div>

                            <div className="item">
                                <img src={require('../../public/images/image4.jpg')} alt="dulich" width="260" height="445" />
                                <div className="carousel-caption">
                                    <h3></h3>
                                    <p></p>
                                </div>
                            </div>

                        </div>

                        {/* <!-- Left and right controls --> */}
                        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
export default Jumbotron