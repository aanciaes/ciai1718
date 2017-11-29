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
                                    <div>Preço: <input type="text" min="0" name="price" className="form-control"
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


class PieceEditar extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.piece;

        this.handleChange = this.handleChange.bind(this);
        this.updatePiece = this.updatePiece.bind(this);
        this.back = this.back.bind(this);
    }

    back() {
       window.history.back();
    }

    updatePiece(e, inputData) {
        e.preventDefault();
        this.props.editPiece(this.state);
    }

    handleChange({target}) {

        let s = this.state;
        if (target.name == 'keywords' || target.name == 'techniques') {
            if (target.value.indexOf(',') > -1) {

                let k = target.value.split(',');
                $.each(k, function (i, val) {
                    if (k.indexOf(val) < 0)
                        k.push(val);
                });
                s[target.name] = k;
            } else
                s[target.name].push(target.value);
        }
        else if (target.name == 'multimedia') {
            s[target.name].push(target.value);
        }
        else
            s[target.name] = target.value;


        this.setState(s);
    }


    render() {
        let p = this.state;
        console.log(p);
        let keywords = p.keywords.length > 0 ? p.keywords.join(",") : "q";
        let multimedia = p.multimedia.length > 0 ? p.multimedia.join(",") : "q";
        let techniques = p.techniques.length > 0 ? p.techniques.join(",") : "q";
        return (
            <div>
                <section>
                    <button className="btn btn-info" onClick={this.back}><i className="fa fa-back"></i></button>

                    <form id="form_create_piece" onSubmit={this.updatePiece}>
                        <h2>Editar Peça</h2>
                        <div className="form-group">
                            <label>Nome:</label>
                            <input type="text" className="form-control" name="name"
                                   placeholder="Inserir nome" value={p.name} onChange={this.handleChange}
                                   required="required"/>
                        </div>
                        <div className="form-group">
                            <label>Data:</label>
                            <input type="date" className="form-control" name="dateOfCreation"
                                   placeholder="Inserir Data" value={p.dateOfCreation} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Técnicas</label>
                            <input type="text" className="form-control" name="techniques"
                                   placeholder="Inserir Técnicnas" value={techniques}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Descrição textual</label>
                            <textarea name="description" className="form-control"
                                      onChange={this.handleChange} value={p.description}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Keywords</label>
                            <input type="text" name="keywords" value={keywords} className="form-control"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Multimedia</label>
                            <input type="url" name="multimedia" className="form-control"
                                   value={multimedia}
                                   onChange={this.handleChange}/>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">Editar</button>
                        </div>

                    </form>
                </section>
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
                            <button className="btn btn-primary" onClick={this.props.showEdit}>Editar</button>
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
                                        <small>Keywords: {p.keywords !== undefined && p.keywords.join(",")}</small>
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
            return (<PieceArtista onSalePiece={props.onSalePiece} showEdit={props.showEdit}/>);
        else
            return (<PieceBasico/>);
    }
    return null;

}


function PieceDetailControl(props) {
    if (props.detail) {
        return (<PieceDetail piece={props.piece}/>)
    }
    return null;
}

function PieceEditControl(props) {
    if (props.edit) {
        return (<PieceEditar piece={props.piece} editPiece={props.editPiece}/>)
    }
    return null;
}

function PieceInitialized(props) {
    if (props.parent.state.piece != null) {
        let p = props.parent;
        return (
            <div className="row">
                <div className="col-md-10">
                    <PieceDetailControl piece={p.state.piece} detail={p.state.detail}/>
                    <PieceEditControl piece={p.state.piece} edit={p.state.edit} editPiece={p.editPiece}/>
                </div>
                <div className="col-md-2">
                    <PieceControl user={p.props.user} onSalePiece={p.onSalePiece} showEdit={p.showEdit}/>
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
            edit: false,
            detail: true
        };
        //this.getPiece = this.getPiece.bind(this);
        this.onSalePiece = this.onSalePiece.bind(this);
        this.showEdit = this.showEdit.bind(this);
        this.editPiece = this.editPiece.bind(this);
    }

    componentDidMount() {
        this.getPiece(this.props.piece_id);
    }


    showEdit() {
        let s = this.state;
        s.detail = false;
        s.edit = true;
        this.setState(s);
    }

    editPiece(p) {
        let t = this;
        $.ajax({
            type: 'PUT',
            url: url + "artwork",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(p),
            success: function (result) {
                console.log(result);
                let s = t.state;
                s.piece = result;
                s.detail = true;
                s.edit = false;
                t.setState(s);
            },
            error: function (status) {
                alert("Erro " + status);
                console.log(status);
            }
        });

    }

    getPiece(id) {
        let t = this;
        $.get(url + "artwork/" + id, function (data) {
            let piece = data.artWork;
            piece.authorName = data.authorName;
            t.state.piece = piece;
            t.setState(t.state);
        });
    }

    onSalePiece(s) {
        let t = this;
        $.ajax({
            type: 'PUT',
            url: url + t.props.piece_id + "/sell?price=" + s.price,
            //contentType: "application/json; charset=utf-8",
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
                <PieceInitialized parent={this}/>
            </div>
        );
    }
}

export default Piece;