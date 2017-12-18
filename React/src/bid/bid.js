/**
 * Created by Tecnico on 09/11/2017.
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import Config from '../config/config';
import Utils from '../utils/utils';
import './bid.css';
import BidBasico from './bidBasico';
import BidArtista from './bidArtista';


const url = Config.url;


class BidDetail extends React.Component {


    render() {
        let b = this.props.bid;

        return (
            <div>
                <section id="bid_detail">
                    <div>
                        <div><b>Id:</b> {b.bidId} </div>
                        <div><b>Bidder:</b> {this.props.bid.bidderEmail} </div>
                        <div><b>Peça:</b> {b.artWorkObject.name} </div>
                        <div><b>Valor:</b> {b.bidAmount} </div>
                        <div><b>Estado:</b>{b.bidState}</div>
                    </div>
                </section>
            </div>
        );
    }
}

function BidControl(props) {
    if (props.user !== undefined && props.user != null) {
        let u = props.user;
        if (u.accountType == 1)
            return (<BidArtista bid={props.bid} updateBid={props.updateBid}/>);
        else if (u.accountType == 0)
            return (<BidBasico bid={props.bid}/>);
    }
    return null;

}


function BidDetailControl(props) {
    if (props.detail) {
        return (<BidDetail bid={props.bid}/>)
    }
    return null;
}


function BidInitialized(props) {
    if (props.parent.state.bid != null) {
        let p = props.parent;
        return (
            <div id="content_bid">
                <div className="title_dash">
                    <h2 className="title tangerine">BID</h2>
                </div>
                <BidControl bid={p.state.bid} user={p.props.user} updateBid={p.updateBid}/>
                <BidDetailControl bid={p.state.bid} detail={p.state.detail}/>

            </div>);
    }
    return null;
}


class Bid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bid: null,
            detail: true
        };
        this.getBid = this.getBid.bind(this);
        this.updateBid = this.updateBid.bind(this);
    }

    componentDidMount() {
        this.getBid(this.props.bid_id);
    }

    getBid(id) {
        let t = this;

        Utils.ajaxRequest('GET',
            url + "bid/" + id,
            function (data) {
                let s = t.state;
                console.log(data);
                s.bid = data;

                t.setState(s);
            },
            true,
            {}
        );
       /* $.get(url + "bid/" + id, function (data) {
            let s = t.state;
            s.bid = data;
            console.log(s);
            t.setState(s);
        });*/
    }

    updateBid(b) {
        let s = this.state.bid;
        s.bid = b;
        this.setState(s);
    }

    render() {
        return (
            <div>
                <BidInitialized parent={this}/>
            </div>
        );
    }
}

export default withRouter(Bid);