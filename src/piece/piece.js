/**
 * Created by Tecnico on 09/11/2017.
 */
import React from 'react';
import {withRouter} from 'react-router-dom';

import './piece.css';
import Config from '../config/config';
import $ from 'jquery';

const url = Config.url;


class PopupRemovePiece extends React.Component {
    constructor(props) {
        super(props);
        this.removePiece = this.removePiece.bind(this);
    }

    removePiece(e, inputData) {
        e.preventDefault();
        this.props.removePiece();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.removePiece}>
                    <div className="modal fade" id="modalRemovePiece" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Remover peça de venda</h4>
                                </div>

                                <div className="modal-body">
                                    <div>
                                        <strong>Pretende remover Peça?</strong>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-6 col-xs-12">
                                            <button type="submit" className="btn btn-success">
                                                Sim
                                            </button>
                                        </div>
                                        <div className="col-md-6 col-xs-12">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">
                                                Fechar
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

class PopupRemoveSale extends React.Component {
    constructor(props) {
        super(props);
        this.removeSalePiece = this.removeSalePiece.bind(this);
    }

    removeSalePiece(e, inputData) {
        e.preventDefault();
        this.props.removeSalePiece();
    }


    render() {
        return (
            <div>
                <form onSubmit={this.removeSalePiece}>
                    <div className="modal fade" id="modalRemoveSale" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Remover peça de venda</h4>
                                </div>

                                <div className="modal-body">
                                    <div>
                                        <strong>Pretende retirar a peça de venda?</strong>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-6 col-xs-12">
                                            <button type="submit" className="btn btn-success">
                                                Sim
                                            </button>
                                        </div>
                                        <div className="col-md-6 col-xs-12">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">
                                                Fechar
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
                                                Fechar
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
        let p = this.props.piece;
        p["keywords"] = p.keywords.length > 0 ? p.keywords.join(",") : "";
        p["multimedia"] = p.multimedia.length > 0 ? p.multimedia.join(",") : "";
        p["techniques"] = p.techniques.length > 0 ? p.techniques.join(",") : "";
        this.state = p;

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
        s[target.name] = target.value;
        this.setState(s);
    }


    render() {
        let p = this.state;
        console.log(p);
        return (
            <div>
                <section>
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
                                   placeholder="Inserir Técnicnas" value={p.techniques}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Descrição textual</label>
                            <textarea name="description" className="form-control"
                                      onChange={this.handleChange} value={p.description}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Keywords</label>
                            <input type="text" name="keywords" value={p.keywords} className="form-control"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Multimedia</label>
                            <input type="url" name="multimedia" className="form-control"
                                   value={p.multimedia}
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
                            <button className="btn btn-danger" data-toggle="modal" data-target="#modalRemovePiece">
                                Remover
                            </button>
                            {this.props.piece.onSale ?
                                <button className="btn btn-primary" data-toggle="modal" data-target="#modalRemoveSale">
                                    Tirar de Venda</button> :
                                <button className="btn btn-primary" data-toggle="modal" data-target="#myModal">Colocar
                                    em Venda</button>
                            }

                            <PopupOnSale onSalePiece={this.props.onSalePiece}/>
                            <PopupRemoveSale removeSalePiece={this.props.removeSalePiece}/>
                            <PopupRemovePiece removePiece={this.props.removePiece}/>
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
                                        <small>Data: {p.dateOfCreation}</small>
                                    </div>
                                    <div>
                                        <small>Keywords: {p.keywords !== undefined && p.keywords.join(",")}</small>
                                    </div>
                                    <div>
                                        <small>Técnicas: {p.techniques !== undefined && p.techniques.join(",")}</small>
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
            return (<PieceArtista onSalePiece={props.onSalePiece} removeSalePiece={props.removeSalePiece}
                                  showEdit={props.showEdit} piece={props.piece} removePiece={props.removePiece}/>);
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
                    <PieceControl user={p.props.user} onSalePiece={p.onSalePiece} piece={p.state.piece}
                                  showEdit={p.showEdit} removeSalePiece={p.removeSalePiece}
                                  removePiece={p.removePiece}/>
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
        this.constructArray = this.constructArray.bind(this);
        this.onSalePiece = this.onSalePiece.bind(this);
        this.removeSalePiece = this.removeSalePiece.bind(this);
        this.removePiece = this.removePiece.bind(this);
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

    constructArray(s) {


        let arr = [];
        if (s.indexOf(",") > -1) {
            let k = s.split(',');
            console.log("k");
            console.log(k);
            arr = k;
        } else
            arr.push(s);
        console.log(arr);
        return arr;
    }

    editPiece(p) {
        let t = this;
        p['multimedia'] = this.constructArray(p['multimedia']);
        p['techniques'] = this.constructArray(p['techniques']);
        p['keywords'] = this.constructArray(p['keywords']);

        /*if (target.value.indexOf(',') > -1) {

         let k = target.value.split(',');
         $.each(k, function (i, val) {
         if (k.indexOf(val) < 0)
         k.push(val);
         });
         s[target.name] = k;
         } else
         s[target.name].push(target.value);*/

        console.log(p);


        $.ajax({
            type: 'PUT',
            url: url + "artwork",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(p),
            success: function (result) {
                console.log("Arrived");
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
            url: url + "artwork/" + t.props.piece_id + "/sell?price=" + s.price,
            //contentType: "application/json; charset=utf-8",
            success: function (result) {
                $('#myModal').modal('hide');
                t.getPiece(t.props.piece_id);

            },
            error: function (status) {
                alert("Erro " + status);
                console.log("Failed	to	Put:	" + status);
            }
        });

    }

    removePiece() {
        let t = this;
        $.ajax({
            type: 'DELETE',
            url: url + "artwork/" + t.props.piece_id,
            //contentType: "application/json; charset=utf-8",
            success: function (result) {
                $('#modalRemovePiece').modal('hide');
                t.props.history.push("/dashboard/piece/mygallery");

            },
            error: function (status) {
                alert("Erro " + status);
                console.log("Failed	to	Put:	" + status);
            }
        });

    }

    removeSalePiece() {
        let t = this;
        $.ajax({
            type: 'PUT',
            url: url + "artwork/" + t.props.piece_id + "/keep",
            //contentType: "application/json; charset=utf-8",
            success: function (result) {
                $('#modalRemoveSale').modal('hide');
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

export default withRouter(Piece);