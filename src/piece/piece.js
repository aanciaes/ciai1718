/**
 * Created by Tecnico on 09/11/2017.
 */
import React from 'react';

import './piece.css';


class PieceArtista extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="col-md-2 col-xs-12">
                    <div>
                        <button className="btn btn-primary">Editar</button>
                    </div>
                </div>
                <div className="col-md-10 col-xs-12"></div>
            </div>
        )
    }

}

class PieceBasico extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="col-md-2 col-xs-12">
                    <div>
                        <button className="btn btn-primary">Bids</button>
                    </div>
                </div>
                <div className="col-md-10 col-xs-12"></div>
            </div>
        )
    }

}

class PieceDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="content_piece">

                    <div className="row">
                        <div className="col-md-3 col-xs-12">
                            <div id="PieceCaroussel" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#PieceCaroussel" data-slide-to="0" className="active"></li>
                                    <li data-target="#PieceCaroussel" data-slide-to="1"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <img src="imgs/logo.png" alt="Los Angeles"/>
                                    </div>

                                    <div className="item">
                                        <img src="imgs/body/body.jpg" alt="Chicago"/>
                                    </div>

                                </div>
                                <a className="left carousel-control" href="#PieceCaroussel" data-slide="prev">
                                    <span className="glyphicon glyphicon-chevron-left"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="right carousel-control" href="#PieceCaroussel" data-slide="next">
                                    <span className="glyphicon glyphicon-chevron-right"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>

                        </div>
                        <div className="col-md-9 col-xs-12">
                            <h2 className="font-bold m-b-xs">
                                Desktop publishing software
                            </h2>
                            <small>Many desktop publishing packages and web page editors now.</small>
                            <div className="m-t-md">
                                <h2 className="product-main-price">$406,602
                                    <small>Exclude Tax</small>
                                </h2>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}


class Piece extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PieceDetail/>
                {this.props.user !== undefined && this.props.user.type == 1 ? <PieceArtista/> : <PieceBasico/>}
            </div>
        );
    }
}

export default Piece;