/**
 * Created by Tecnico on 09/11/2017.
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import PieceArtista from './pieceArtista';
import PieceBasico from './pieceBasico';
import './piece.css';
import Config from '../config/config';
import $ from 'jquery';

const url = Config.url;


class PieceBids extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bids: []
        };
        this.getBidsPiece = this.getBidsPiece.bind(this);
    }

    componentDidMount() {
        this.getBidsPiece();
    }

    getBidsPiece() {
        let t = this;

        $.ajax({
            type: 'GET',
            url: url + "bid/piece/" + t.props.piece.id,
            success: function (result) {
                console.log(result);
                t.state.bids = result;
                t.setState(t.state);
            },
            error: function (status) {
                alert("Erro " + status);
                console.log(status);
            }
        });

    }

    render() {
        console.log(this.state.bids);
        let columns = [
            {title: 'BidId', prop: 'bidId'},
            {title: 'Bidder', prop: 'userId'},
            {title: 'Valor', prop: 'bidAmount'},
        ];
        return (
            <div>
                <h2 className="subtitle40 tangerine">Bids</h2>
                <div className="table-responsive">
                    <table className="table-striped table-bordered table-hover table-condensed" id="bids" width="100%">
                        <thead>
                        <tr>
                            <th>BidId</th>
                            <th>Bidder</th>
                            <th>Valor</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.bids.map((bid, index) => (
                                <tr key={index}>
                                    <td>{bid.bidId}</td>
                                    <td>{bid.userId}</td>
                                    <td>{bid.bidAmount}</td>
                                </tr>
                            ))
                        }
                        <tr>

                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}


class PieceDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let p = this.props.piece;

        return (
            <div>
                <section className="content_piece">


                    <div className="row">
                        <div className="col-md-6 col-xs-12">

                            <div className="img_content">
                                <div id="caroussel_piece" className="carousel slide img_content" data-ride="carousel">

                                    <div className="carousel-inner">

                                        {
                                            p.multimedia.map((image, index)=>(
                                                <div key={index} className={index == 0 ? "item active" : "item"}>
                                                    <img src={image} alt={image}/>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <a className="left carousel-control" href="#caroussel_piece" data-slide="prev">
                                        <span className="glyphicon glyphicon-chevron-left"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="right carousel-control" href="#caroussel_piece" data-slide="next">
                                        <span className="glyphicon glyphicon-chevron-right"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>


                        </div>
                        <div className="col-md-6 col-xs-12">

                            <div className="description_piece">
                                <div className="header_description">
                                    <div className="row">
                                        <div className="col-md-3 col-xs-12">
                                            <div className="title_piece">
                                                {p.name}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xs-12"></div>
                                        <div className="col-md-3 col-xs-12">
                                            <h4 className="onSale"> {p.onSale ? "Em Venda: " + p.price + "€ " : ""}</h4>
                                        </div>
                                    </div>
                                    <div>
                                        <small>Autor: {p.authorName}</small>
                                    </div>
                                    <div>
                                        <small>Data: {p.dateOfCreation}</small>
                                    </div>
                                    <div>
                                        <small>Keywords: {p.keywords !== undefined ? p.keywords.join(",") : ""}</small>
                                    </div>
                                    <div>
                                        <small>
                                            Técnicas: {p.techniques !== undefined ? p.techniques.join(",") : ""}</small>
                                    </div>
                                </div>

                                <PieceBids piece={p}/>

                            </div>

                        </div>
                    </div>


                    <div className="content content_description">
                        <h2>Descrição</h2>
                        <p>{p.description}</p>
                    </div>

                </section>
            </div>
        );
    }
}

function PieceControl(props) {
    if (props.user !== undefined && props.user != null) {
        let u = props.user;
        if (u.accountType == 1 && props.piece.author == u.id)
            return (<PieceArtista piece={props.piece} updatePiece={props.updatePiece} getPiece={props.getPiece}
                                  hideDetail={props.hideDetail}/>);
        else if (u.accountType == 0)
            return (<PieceBasico piece={props.piece} user={u}/>);
    }
    return null;

}


function PieceDetailControl(props) {
    if (props.detail) {
        return (<div>
            <PieceDetail piece={props.piece}/>
        </div>)
    }
    return null;
}


function PieceInitialized(props) {
    if (props.parent.state.piece != null) {
        let p = props.parent;
        return (

            <div>
                <div>
                    <PieceControl piece={p.state.piece} user={p.props.user} updatePiece={p.updatePiece}
                                  getPiece={p.getPiece} hideDetail={p.hideDetail}/>
                </div>
                <div>
                    <PieceDetailControl piece={p.state.piece} detail={p.state.detail}/>
                </div>
            </div>);
    }
    return null;
}


class Piece extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            piece: null,
            detail: true
        };
        this.getPiece = this.getPiece.bind(this);
        this.updatePiece = this.updatePiece.bind(this);
        this.hideDetail = this.hideDetail.bind(this);
    }

    componentDidMount() {
        this.getPiece(this.props.piece_id);
    }

    hideDetail() {
        let s = this.state;
        s.detail = false;
        this.setState(s);
    }


    getPiece(id) {
        let t = this;
        $.get(url + "artwork/" + id, function (data) {

            let piece = data.artWork;
            piece.authorName = data.authorName;
            let s = t.state;
            console.log(s);
            s.piece = piece;

            t.setState(s);
        });
    }

    updatePiece(p) {

        let s = this.state;
        s.piece = p;
        s.detail = true;

        this.setState(s);
    }

    render() {
        return (
            <div>
                <PieceInitialized parent={this}/>
            </div>
        );
    }
}

export default withRouter(Piece);