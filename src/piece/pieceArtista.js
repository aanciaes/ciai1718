/**
 * Created by Tecnico on 09/11/2017.
 */
import React from 'react';
import {withRouter} from 'react-router-dom';

import './piece.css';
import Config from '../config/config';
import Utils from '../utils/utils';
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
                                                       onChange={this.handleChange} required="required"/>
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
        p["multimedia"] = p.multimedia.length > 0 ? p.multimedia.join("\n") : "";
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
        return (
            <div>
                <section className="content_form_big" id="section_edit">

                    <form id="form_edit_piece" onSubmit={this.updatePiece}>
                        <div className="form_title">
                            <h5 className="tangerine subtitle">Editar Peça</h5>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-xs-12">

                                <div className="form-group row">

                                    <label htmlFor="name" className="col-sm-2 col-form-label">Nome</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="name" className="form-control" name="name"
                                               placeholder="Inserir nome" value={p.name} onChange={this.handleChange}
                                               required="required"/>
                                    </div>

                                </div>

                                <div className="form-group row">
                                    <label htmlFor="dateOfCreation" className="col-sm-2 col-form-label">Data:</label>

                                    <div className="col-sm-4">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i
                                                className="fa fa-calendar"></i></span>
                                            <input type="date" id="dateOfCreation" className="form-control"
                                                   name="dateOfCreation"
                                                   placeholder="Inserir Data" value={p.dateOfCreation}
                                                   onChange={this.handleChange}/>
                                        </div>
                                    </div>

                                </div>

                                <div className="form-group row">

                                    <label htmlFor="techniques" className="col-sm-2 col-form-label">Técnicas</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="techniques" name="techniques"
                                               placeholder="valor,valor,.." pattern="^(?:[a-zÀ-úA-Z0-9 ]+,)*[a-zÀ-úA-Z0-9 ]+$"
                                               value={p.techniques} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="form-group row">

                                    <label htmlFor="keywords" className="col-sm-2 col-form-label">Keywords:</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="keywords" id="keywords"
                                               pattern="^(?:[a-zÀ-úA-Z0-9 ]+,)*[a-zÀ-úA-Z0-9 ]+$" placeholder="valor,valor,.."
                                               value={p.keywords} className="form-control"
                                               onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="form-group row">

                                    <label htmlFor="multimedia" className="col-sm-2 col-form-label">Multimedia</label>
                                    <div className="col-sm-10">
                                       <textarea name="multimedia" id="multimedia" className="form-control"
                                                 onChange={this.handleChange} value={p.multimedia}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-xs-12">
                                <div className="form-group left_text">
                                    <label>Descrição textual</label>
                                    <textarea name="description" className="form-control"
                                              onChange={this.handleChange} value={p.description}></textarea>
                                </div>

                            </div>
                        </div>


                        <div className="button_submit">
                            <button type="submit" className="btn btn-primary">Gravar</button>
                        </div>

                    </form>
                </section>
            </div>
        )
    }
}


function PieceEditControl(props) {
    if (props.edit) {
        return (<PieceEditar piece={props.piece} editPiece={props.editPiece}/>)
    }
    return null;
}


class PieceArtista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
        //this.getPiece = this.getPiece.bind(this);
        this.constructArray = this.constructArray.bind(this);
        this.onSalePiece = this.onSalePiece.bind(this);
        this.removeSalePiece = this.removeSalePiece.bind(this);
        this.removePiece = this.removePiece.bind(this);
        this.showEdit = this.showEdit.bind(this);
        this.editPiece = this.editPiece.bind(this);
    }

    showEdit() {
        this.props.hideDetail();
        let s = this.state;
        s.edit = true;
        this.setState(s);
    }

    constructArray(s) {


        let arr = [];
        if (s.indexOf(",") > -1) {
            let k = s.split(',');
            arr = k;
        } else if (s.indexOf("\n") > -1) {
            let k = s.split('\n');
            arr = k;
        } else
            arr.push(s);

        return arr;
    }

    editPiece(p) {
        let t = this;
        p['multimedia'] = this.constructArray(p['multimedia']);
        p['techniques'] = this.constructArray(p['techniques']);
        p['keywords'] = this.constructArray(p['keywords']);

        Utils.ajaxRequest('PUT',
            url + "artwork",
            function (result) {
                t.props.updatePiece(result);
                let s = t.state;
                s.edit = false;
                t.setState(s);
            },
            true,
            {
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(p)
            }
        );

        /*$.ajax({
            type: 'PUT',
            url: url + "artwork",
            xhrFields: {withCredentials: true},
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(p),
            success: function (result) {
                t.props.updatePiece(result);
                let s = t.state;
                s.edit = false;
                t.setState(s);
                /* let s = t.state;
                 s.piece = result;
                 s.edit = false;
                 t.setState(s);
            },
            error: function (status) {
                alert("Erro " + status);
                console.log(status);
            }
        });*/

    }

    onSalePiece(s) {
        let t = this;

        Utils.ajaxRequest('PUT',
            url + "artwork/" + t.props.piece.id + "/sell?price=" + s.price,
            function (result) {
                $('#myModal').modal('hide');
                t.props.getPiece(t.props.piece.id);
            },
            true,
            {}
        );
        /*$.ajax({
            type: 'PUT',
            url: url + "artwork/" + t.props.piece.id + "/sell?price=" + s.price,
            xhrFields: {withCredentials: true},
            //contentType: "application/json; charset=utf-8",
            success: function (result) {
                $('#myModal').modal('hide');
                t.props.getPiece(t.props.piece.id);

            },
            error: function (status) {
                alert("Erro " + status.responseJSON.exception);
                console.log(status.responseJSON.exception);
            }
        });*/

    }

    removePiece() {
        let t = this;

        Utils.ajaxRequest('DELETE',
            url + "artwork/" + t.props.piece.id,
            function (result) {
                $('#modalRemovePiece').modal('hide');
                t.props.history.push("/dashboard/piece/mygallery");

            },
            true,
            {}
        );

       /* $.ajax({
            type: 'DELETE',
            url: url + "artwork/" + t.props.piece.id,
            xhrFields: {withCredentials: true},
            //contentType: "application/json; charset=utf-8",
            success: function (result) {
                $('#modalRemovePiece').modal('hide');
                t.props.history.push("/dashboard/piece/mygallery");

            },
            error: function (status) {
                alert("Erro " + status);
                console.log("Failed	to	Put:	" + status);
            }
        });*/

    }

    removeSalePiece() {
        let t = this;

        Utils.ajaxRequest('PUT',
            url + "artwork/" + t.props.piece.id + "/keep",
            function (result) {
                $('#modalRemoveSale').modal('hide');
                t.props.getPiece(t.props.piece.id);

            },
            true,
            {}
        );

        /*$.ajax({
            type: 'PUT',
            url: url + "artwork/" + t.props.piece.id + "/keep",
            xhrFields: {withCredentials: true},
            //contentType: "application/json; charset=utf-8",
            success: function (result) {
                $('#modalRemoveSale').modal('hide');
                t.props.getPiece(t.props.piece.id);

            },
            error: function (status) {
                alert("Erro " + status);
                console.log("Failed	to	Put:	" + status);
            }
        });*/

    }

    render() {
        return (
            <div>
                <div className="menu_buttons">
                    <button className="btn btn-primary" onClick={this.showEdit}>Editar</button>
                    <button className="btn btn-danger" data-toggle="modal" data-target="#modalRemovePiece">
                        Remover
                    </button>
                    {this.props.piece.onSale ?
                        <button className="btn btn-primary" data-toggle="modal" data-target="#modalRemoveSale">
                            Tirar de Venda</button> :
                        <button className="btn btn-primary" data-toggle="modal" data-target="#myModal">Colocar
                            em Venda</button>
                    }

                    <PopupOnSale onSalePiece={this.onSalePiece}/>
                    <PopupRemoveSale removeSalePiece={this.removeSalePiece}/>
                    <PopupRemovePiece removePiece={this.removePiece}/>
                </div>
                <div>
                    <PieceEditControl edit={this.state.edit} piece={this.props.piece} editPiece={this.editPiece}/>
                </div>
            </div>
        );
    }
}

export default withRouter(PieceArtista);