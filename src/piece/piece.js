/**
 * Created by Tecnico on 09/11/2017.
 */
import React from 'react';

import './piece.css';
import Config from '../config/config';
import $ from 'jquery';

const url = Config.url;


class PopupOnSale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSalePiece = this.onSalePiece.bind(this);
    }

    handleChange({target}) {
        this.setState({
                [target.name]: target.value
            }
        )
    }

    onSalePiece(e, inputData) {
        e.preventDefault();
        this.props.onSalePiece(this.state);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSalePiece}>
                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Colocar peça em venda</h4>
                                </div>


                                <div className="modal-body">
                                    <div>Preço: <input type="number" min="0" name="price" className="form-control"
                                                       onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-6 col-xs-12">
                                            <button type="submit" className="btn btn-success">
                                                Gravar
                                            </button>
                                        </div>
                                        <div className="col-md-6 col-xs-12">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">
                                                Close
                                            </button>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


class PieceArtista extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="row">

                    <div className="col-md-2 col-xs-12">
                        <div>
                            <button className="btn btn-primary">Bids</button>
                            <button className="btn btn-primary" data-toggle="modal" data-target="#myModal">Colocar
                                em
                                Venda
                            </button>
                            <PopupOnSale onSalePiece={this.props.onSalePiece}/>
                        </div>
                    </div>
                    <div className="col-md-10 col-xs-12">
                    </div>

                </div>
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
                <div className="row">

                    <div className="col-md-2 col-xs-12">
                        <div>
                            <button className="btn btn-primary">Bids</button>
                        </div>
                    </div>
                    <div className="col-md-10 col-xs-12">
                    </div>

                </div>

            </div>
        )
    }

}

class PieceDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let p = this.props.piece;
        console.log(p);
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
                                <div className="title_piece">
                                    {p.name}
                                </div>

                                <small>Keywords: {p.keywords.join(",")}</small>
                                <div className="m-t-md">
                                    <h2 className="product-main-price">$406,602
                                        <small>Exclude Tax</small>
                                    </h2>
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
        if (u.type == 1)
            return (<PieceArtista onSalePiece={props.onSalePiece}/>);
        else
            return (<PieceBasico/>);
    }
    return null;

}


function PieceInitialized(props) {
    if (props.piece != null) {

        return (
            <div className="row">
                <div className="col-md-10">
                    <PieceDetail piece={props.piece}/>
                </div>
                <div className="col-md-2">
                    <PieceControl user={props.user} onSalePiece={props.onSalePiece}/>
                </div>
            </div>);
    }
    return null;
}


class Piece extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            piece: null
        };
        //this.getPiece = this.getPiece.bind(this);
        this.onSalePiece = this.onSalePiece.bind(this);
    }

    componentDidMount() {
        this.getPiece(this.props.piece_id);
    }


    getPiece(id) {
        let t = this;
        $.get(url + "artwork/" + id, function (data) {
            t.state.piece = data;
            t.setState(t.state);
        });
    }

    onSalePiece(s) {
        let t = this;
        $.ajax({
            type: 'PUT',
            url: url + t.props.piece_id + "/sell",
            //contentType: "application/json; charset=utf-8",
            data: {
                price: s.price
            },
            success: function (result) {
                t.getPiece(t.props.piece_id);
            },
            error: function (status) {
                alert("Erro " + status);
                console.log("Failed	to	Put:	" + status);
            }
        });

    }

    render() {
        return (
            <div>
                <PieceInitialized piece={this.state.piece} user ={this.props.user} onSalePiece={this.onSalePiece}/>
            </div>
        );
    }
}

export default Piece;