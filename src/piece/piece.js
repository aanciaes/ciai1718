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
                        <div className="col-md-4 col-xs-12">

                            <div className="img_content">
                                <img src={p.multimedia}/>
                            </div>

                        </div>
                        <div className="col-md-8 col-xs-12">

                            <div className="description_piece">
                                <div className="header_description">
                                    <div className="title_piece">
                                        {p.name}
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
                                    <div className="m-t-md">
                                        <h4> {p.onSale ? "Em Venda: " + p.price + "€ " : ""}</h4>
                                    </div>
                                </div>
                                <div className="content">
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
        if (u.accountType == 1)
            return (<PieceArtista piece={props.piece} updatePiece={props.updatePiece} getPiece={props.getPiece}/>);
        else if (u.accountType == 0)
            return (<PieceBasico piece={props.piece} user={u}/>);
    }
    return null;

}


function PieceDetailControl(props) {
    if (props.detail) {
        return (<PieceDetail piece={props.piece}/>)
    }
    return null;
}


function PieceInitialized(props) {
    if (props.parent.state.piece != null) {
        let p = props.parent;
        return (
            <div className="row">
                <div className="col-md-6">
                    <PieceDetailControl piece={p.state.piece} detail={p.state.detail}/>
                </div>
                <div className="col-md-6">
                    <PieceControl piece={p.state.piece} user={p.props.user} updatePiece={p.updatePiece}
                                  getPiece={p.getPiece}/>
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
    }

    componentDidMount() {
        this.getPiece(this.props.piece_id);
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

        let s = this.state.piece;
        s.piece = p;
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