/**
 * Created by Tecnico on 09/11/2017.
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import Config from '../config/config';
import $ from 'jquery';

const url = Config.url;


class PopupRemoveBid extends React.Component {
    constructor(props) {
        super(props);
        this.removeBid = this.removeBid.bind(this);
    }


    removeBid(e, inputData) {
        e.preventDefault();
        this.props.removeBid();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.removeBid}>
                    <div className="modal fade" id="modalRemoveBid" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Anular Bid</h4>
                                    <b>Pretende anular bid??</b>
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




class BidBasico extends React.Component {
    constructor(props) {
        super(props);
        this.removeBid = this.removeBid.bind(this);

    }

    removeBid() {
        let t = this;
        $.ajax({
            type: 'DELETE',
            url: url + "bid/"+t.props.bid.bid.bidId,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                $('#modalRemoveBid').modal('hide');
                t.props.history.push("/dashboard/mybids");
            },
            error: function (status) {
                alert("Erro " + status);
                console.log(status);
            }
        });
    }

    render() {
        return (
            <div>
                <div className="menu_buttons">
                    <button className="btn btn-danger" data-toggle="modal" data-target="#modalRemoveBid">
                        Anular Bid
                    </button>
                    <PopupRemoveBid removeBid={this.removeBid}/>
                </div>

            </div>
        );
    }
}

export default withRouter(BidBasico);