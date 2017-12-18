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


class PopupBid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bidAmount: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.makeBid = this.makeBid.bind(this);
    }

    handleChange({target}) {
        this.setState({
                [target.name]: target.value
            }
        )
    }

    makeBid(e, inputData) {
        e.preventDefault();
        this.props.makeBid(this.state.bidAmount);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.makeBid}>
                    <div className="modal fade" id="modalBid" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Fazer Bid</h4>
                                    <b>Têm que ser um valor maior que preço da peça!!</b>
                                </div>


                                <div className="modal-body">
                                    <div>Valor Bid : <input type="text" min="0" name="bidAmount"
                                                            className="form-control"
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




class PieceBasico extends React.Component {
    constructor(props) {
        super(props);
        this.makeBid = this.makeBid.bind(this);

    }

    makeBid(amount) {
        let t = this;
        let b = {
            bidAmount: amount,
            pieceId: t.props.piece.id,
            bidderId: t.props.user.id
        };

        Utils.ajaxRequest('POST',
            url + "bid",
            function (result) {
                console.log(result);
                $('#modalBid').modal('hide');
                t.props.history.push("/dashboard/mybids");
            },
            true,
            {
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(b),
            }
        );

       /* $.ajax({
            type: 'POST',
            url: url + "bid",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},
            data: JSON.stringify(b),
            success: function (result) {
                console.log(result);
                $('#modalBid').modal('hide');
                t.props.history.push("/dashboard/mybids");
            },
            error: function (status) {
                alert("Erro " + status);
                console.log(status);
            }
        });*/
    }

    render() {
        return (
            <div>
                <div className="menu_buttons">
                    {this.props.piece.onSale ?
                        <button className="btn btn-primary" data-toggle="modal" data-target="#modalBid">
                            Fazer Bid
                        </button> : ""
                    }
                    <PopupBid makeBid={this.makeBid}/>
                </div>

            </div>
        );
    }
}

export default withRouter(PieceBasico);