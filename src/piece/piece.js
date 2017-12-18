/**
 * Created by Tecnico on 09/11/2017.
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import PieceArtista from './pieceArtista';
import PieceBasico from './pieceBasico';
import './piece.css';
import Config from '../config/config';
import Utils from '../utils/utils';
import $ from 'jquery';

const url = Config.url;


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
                                                <div key={index} className={index === 0 ? "item active" : "item"}>
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

                                <div className="content_description">
                                    <h2>Descrição</h2>
                                    <p>{p.description}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function PieceControl(props) {
    if (props.user !== undefined && props.user != null) {
        let u = props.user;
        if (u.accountType === 1 && props.piece.author === u.id)
            return (<PieceArtista piece={props.piece} updatePiece={props.updatePiece} getPiece={props.getPiece}
                                  hideDetail={props.hideDetail}/>);
        else if (u.accountType === 0)
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
                <div className="row">
                    <div className="col-md-12">

                        <PieceControl piece={p.state.piece} user={p.props.user} updatePiece={p.updatePiece}
                                      getPiece={p.getPiece} hideDetail={p.hideDetail}/>
                        <PieceDetailControl piece={p.state.piece} detail={p.state.detail}/>
                    </div>
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

        Utils.ajaxRequest('GET',
            url + "artwork/" + id,
            function (data) {
                let piece = data.artWork;
                piece.authorName = data.authorName;
                let s = t.state;
                s.piece = piece;
                t.setState(s);
            },
            true,
            {}
        );

        /*$.ajax({
         type: 'GET',
         xhrFields: {withCredentials: true},
         url: url + "artwork/" + id,
         //contentType: "application/json; charset=utf-8",
         success: function (data, textStatus, request) {
         let piece = data.artWork;
         piece.authorName = data.authorName;
         let s = t.state;
         s.piece = piece;
         t.setState(s);
         },
         error: function (status) {
         alert("Erro");
         console.log(status);
         }
         });*/
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