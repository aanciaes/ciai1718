/**
 * Created by Tecnico on 09/11/2017.
 */
import React, {Component} from 'react';
import './publicGallery.css';
import {Route, Link, withRouter} from 'react-router-dom'
import $ from 'jquery';
import Config from '../config/config';
import Piece from '../piece/piece';

const url = Config.url;


class PieceItem extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        let p = this.props.piece;
        return (
            <div>
                <div className="piece_content">
                    <div className="img_piece">
                        <div>
                            <img src={p.multimedia}/>
                        </div>
                    </div>
                    <div className="desc_piece">

                        <span className={p.onSale ? "price_prod":""}> {p.onSale ? p.price + " €" : "" }</span>
                        <div>
                            <small>Keywords: {p.keywords.join(",")}</small>
                        </div>
                        <div><label>{p.name}</label></div>
                        <div>
                            <small>{p.description}</small>
                        </div>
                        <div className="info_button">
                            <div>Info <i className="fa fa-arrow-circle-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class PiecesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pieces: []
        };

        this.getPieces(this.state);
        this.updatePiece = this.updatePiece.bind(this);

    }

    updatePiece(piece_id) {
        this.props.updatePiece(true, piece_id);
    }

    getPieces(state) {


        let t = this;
        $.get(url + "artwork", function (data) {

            state.pieces = data;
            t.setState(state);
        });
    }

    render() {
        let currentLocation = window.location.pathname;
        let parent = "";
        if (currentLocation.indexOf("dashboard") > -1) {
            parent = "/dashboard";
        }

        return (
            <div className="row">

                {
                    this.state.pieces.map((piece, index)=>
                        (<div key={index} className="col-md-3 col-xs-12">
                            <Link to={parent + "/pieces/" + piece.id}>
                                <PieceItem piece={piece} updatePiece={this.props.updatePiece}/>
                            </Link>
                        </div>)
                    )

                }

            </div>);
    }
}


class Gallery extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="gallery">
                    <div className="row">
                        <div className="col-md-2 col-xs-12">
                        </div>
                        <div className="col-md-7 col-xs-12">
                            <div id="search_field">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-search"></i></span>
                                    <input id="search" type="search" className="form-control" name="search"
                                           placeholder="Procurar"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12">
                        </div>
                    </div>
                    <PiecesList updatePiece={this.props.updatePiece}/>
                </section>


            </div>
        );
    }
}

function PieceControl(props) {
    if (props.piece) {
        return (<Piece user={props.user}/>);
    }
    return null;
}

function GalleryControl(props) {
    if (props.gallery) {
        return (<Gallery updatePiece={props.updatePiece}/>)
    }
    return null;
}


class PublicGallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gallery: true,
            piece: false
        };

        this.getInitialState = this.getInitialState.bind(this);
        this.updateGallery = this.updateGallery.bind(this);
        this.updatePiece = this.updatePiece.bind(this);
    }

    getInitialState() {
        return {
            gallery: false,
            piece: false,
            piece_id: null
        };
    }

    updateGallery(g) {

        let s = this.getInitialState();
        s.gallery = g;
        this.setState(s);
    }

    updatePiece(p, piece_id) {

        let s = this.getInitialState();
        s.piece = p;
        s.piece_id = piece_id;
        this.setState(s);
    }

    render() {
        let u = this.props.user !== undefined ? this.props.user : null;
        return (
            <div>
                <GalleryControl gallery={this.state.gallery} updatePiece={this.updatePiece}/>
                <PieceControl piece={this.state.piece} user={u} piece_id={this.state.piece_id}/>
            </div>
        );
    }
}

export default PublicGallery;