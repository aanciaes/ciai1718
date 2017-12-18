/**
 * Created by Tecnico on 09/11/2017.
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import Utils from '../utils/utils';
import Config from '../config/config';
import $ from 'jquery';

const url = Config.url;

const OPEN = "OPEN";
const ACCEPTED = "ACCEPTED";


const ButtonsAcceptReject = () =>
    <div>
        <button className="btn btn-success" data-toggle="modal" data-target="#modalAcceptBid">
            Aceitar Bid
        </button>
        <button className="btn btn-danger" data-toggle="modal" data-target="#modalRejectBid">
            Rejeitar Bid
        </button>
    </div>;

const ButtonFinalize = () =>
    <div>
        <button className="btn btn-info" data-toggle="modal" data-target="#modalFinalizeBid">
            Finalizar
        </button>
    </div>;


class PopupFinalizeBid extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            isPublic:false
        },
        this.finalizeBid = this.finalizeBid.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({target}) {

        let s = this.state;
        s[target.name] = target.checked;
        this.setState(s);
    }


    finalizeBid(e, inputData) {
        e.preventDefault();
        this.props.finalizeBid(this.state.isPublic);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.finalizeBid}>
                    <div className="modal fade" id="modalFinalizeBid" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Finalizar Bid</h4>
                                    <b>Pretende Finalizar bid (vai ser criada uma venda)??</b>
                                </div>
                                <div className="modal-footer">
                                    <div id="public_question">
                                        <strong>Pretende tornar venda pública: </strong> <input type="checkbox" name="isPublic"
                                                                                  onChange={this.handleChange}/>
                                    </div>
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

class PopupAcceptBid extends React.Component {
    constructor(props) {
        super(props);
        this.acceptBid = this.acceptBid.bind(this);
    }


    acceptBid(e, inputData) {
        e.preventDefault();
        this.props.acceptBid();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.acceptBid}>
                    <div className="modal fade" id="modalAcceptBid" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Aceitar Bid</h4>
                                    <b>Pretende aceitar bid??</b>
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

class PopupRejectBid extends React.Component {
    constructor(props) {
        super(props);
        this.rejectBid = this.rejectBid.bind(this);
    }


    rejectBid(e, inputData) {
        e.preventDefault();
        this.props.rejectBid();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.rejectBid}>
                    <div className="modal fade" id="modalRejectBid" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Aceitar Bid</h4>
                                    <b>Pretende Rejeitar bid??</b>
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


class BidArtista extends React.Component {
    constructor(props) {
        super(props);
        this.acceptBid = this.acceptBid.bind(this);
        this.rejectBid = this.rejectBid.bind(this);
        this.finalizeBid = this.finalizeBid.bind(this);
    }

    acceptBid() {
        let t = this;

        Utils.ajaxRequest('PUT',
            url + "bid/" + t.props.bid.bidId + "/accept",
            function (result) {

                $('#modalAcceptBid').modal('hide');
                t.props.updateBid(result);
            },
            true,
            {}
        );

    }

    rejectBid() {
        let t = this;

        Utils.ajaxRequest('PUT',
            url + "bid/" + t.props.bid.bidId + "/reject",
            function (result) {

                $('#modalRejectBid').modal('hide');
                t.props.updateBid(result);
            },
            true,
            {}
        );

    }

    finalizeBid(data) {
        let t = this;
        Utils.ajaxRequest('PUT',
            url + "bid/" + t.props.bid.bidId + "/finalize?isPublic="+data,
            function (result) {

                $('#modalFinalizeBid').modal('hide');
                t.props.updateBid(result);
            },
            true,
            {}
        );
    }

    render() {
        return (
            <div>
                <div className="menu_buttons">

                    {this.props.bid.bidState === OPEN ? <div>
                        <ButtonsAcceptReject/>
                        <PopupAcceptBid acceptBid={this.acceptBid}/>
                        <PopupRejectBid rejectBid={this.rejectBid}/>
                    </div> : ""}
                    {this.props.bid.bidState === ACCEPTED ?
                        <div>
                            <ButtonFinalize/>
                            <PopupFinalizeBid finalizeBid ={this.finalizeBid}/>
                        </div>
                        : ""}

                </div>

            </div>
        );
    }
}

export default withRouter(BidArtista);