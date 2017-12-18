/**
 * Created by Tecnico on 09/11/2017.
 */
import {Route, withRouter, Link, Redirect} from 'react-router-dom'

import React, {Component} from 'react';
import User from './user';
import DashboardArtista from './dashboardArtista';
import DashboardBasico from './dashboardBasico';
import './dashboard.css';
import PublicGallery from '../publicGallery/publicGallery';
import Piece from '../piece/piece';
import Bid from '../bid/bid';
import Utils from '../utils/utils';
import Config from '../config/config';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import $ from 'jquery'
const url = Config.url;

var socket;
var stompClient;

const BIDSTATE = {
    "OPEN": "Pendente",
    "ACCEPTED": "Aceite",
    "REJECTED": "Rejeitado",
    "FINALIZED": "Finalizado"
};

function StateBadges(props) {
    switch (props.state) {
        case "OPEN":
            return (<span className="label label-warning">{BIDSTATE[props.state]}</span>)
        case "ACCEPTED":
            return (<span className="label label-success">{BIDSTATE[props.state]}</span>)
        case "REJECTED":
            return (<span className="label label-danger">{BIDSTATE[props.state]}</span>)
        case "FINALIZED":
            return (<span className="label label-info">{BIDSTATE[props.state]}</span>)
    }
}


const BidItem = ({bid})=>
    <div>
        <div className="row">
            <div className="col-md-1 col-xs-12 state_bid">
                <StateBadges state={bid.bidState}/>
            </div>
            <div className="col-md-2 col-xs-12 img_bid">
                <img className="img-circle"
                     src={bid.artWorkObject.multimedia.length > 0 ? bid.artWorkObject.multimedia[0] : ""}/>
            </div>
            <div className="col-md-7 col-xs-12 description">
                <p>Valor:{bid.bidAmount}</p>
                <p>Peça:{bid.artWorkObject.name}</p>
                <p>Bidder:{bid.bidderEmail}</p>
            </div>
            <div className="col-md-2 col-xs-12 buttons">
                <div>
                    <Link to={"/dashboard/bid/" + bid.bidId} className="btn btn-info">
                        <i className="fa fa-eye"></i>
                    </Link>
                </div>
            </div>
        </div>
    </div>;


class MenuOptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };
        this.notifications = this.notifications.bind(this);
        this.readNotification = this.readNotification.bind(this);
        this.getNotifications = this.getNotifications.bind(this);
    }

    componentDidMount() {
        this.notifications();
    }

    notifications() {


        socket = new SockJS(url + 'art-biz/');
        stompClient = Stomp.over(socket);
        let user = this.props.user;
        let t = this;

        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/' + user.id + '/notify', function (data) {


                let d = JSON.parse(data.body);
                if (d.state == 'NEW')
                    t.state.notifications.push(d);

                t.setState(t.state);
            });

            t.getNotifications(user.id)
        });


    }

    getNotifications(userId) {
        Utils.ajaxRequest("GET",
            url + "notifications/user/" + userId,
            function (data) {
            },
            true,
            {});
    }


    readNotification(id, bidId) {

        let t = this;
        let user = this.props.user;
        Utils.ajaxRequest("PUT",
            url + "notifications/" + id + "/read"
            , function (data) {
                t.state.notifications = [];
                t.setState(t.state);
                t.getNotifications(user.id);
                t.props.history.push("/dashboard/bid/" + bidId);
            }, true, {})

    }


    render() {
        let size = this.state.notifications.length;
        return (
            <div>


                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a id="flag" className="dropdown-toggle count-info"
                           data-toggle="dropdown">
                            <i className="fa fa-envelope"></i>
                            <span className="count label label-primary">{size > 0 ? size : ""}</span>
                        </a>
                        <ul className="dropdown-menu dropdown-alerts">

                            {this.state.notifications.map((n, index) => (
                                <li key={index}>
                                    <a onClick={()=>this.readNotification(n.id, n.bid.bidId)}>
                                        <div>
                                            <i className="fa fa-envelope fa-fw"></i>{n.message}
                                            <span
                                                className="pull-right text-muted small">{Utils.diff_minutes(new Date(n.date), new Date())}
                                                minutes ago</span>
                                        </div>
                                    </a>
                                    <div className="clear"></div>
                                </li>

                            ))}
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a id="user-profile" className="dropdown-toggle"
                           data-toggle="dropdown"><img
                            className="img-responsive img-thumbnail img-circle"/>
                            {this.props.user.name}</a>
                        <ul className="dropdown-menu dropdown-block" role="menu">
                            <li>
                                <Link to={"/dashboard/user"}>
                                    <div>
                                        <i className="fa fa-user"></i> Perfil
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <a onClick={this.props.logout}>
                                    <div>
                                        <i className="fa fa-sign-out"></i> Logout
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        )

    }


}

class MyBids extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bids: []
        };

        this.getMyBids(this.state);

    }

    getMyBids(state) {
        let t = this;
        let u = url + "bid/artist/" + this.props.user.id;
        if (this.props.user.accountType == 0)
            u = url + "bid/user/" + this.props.user.id;

        Utils.ajaxRequest('GET',
            u,
            function (data) {
                state.bids = data;

                t.setState(state);
            },
            true,
            {}
        );

    }

    render() {

        return (<div>


            <ul id="list_my_bids">
                {
                    this.state.bids.map(
                        (bid, index) =>
                            (
                                <li className="list-group-item" key={index}>
                                    <BidItem bid={bid}/>
                                </li>
                            )
                    )
                }
            </ul>


        </div>);
    }

}


const SalesItem = ({sale})=>
    <div id="sales_detail">
        <p><strong>Bid: </strong> {sale.bidId}</p>
        <p><strong>Comprador: </strong> {sale.buyerEmail}</p>
        <p><strong>Data: </strong> {sale.dateOfSale}</p>
        <p><strong>Público: </strong> {sale.public ? "SIM" : "NÃO"}</p>
    </div>;


class Sales extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sales: []
        };

        // this.getMySales(this.state);

    }

    componentDidMount() {
        this.getMySales(this.state);
    }

    getMySales(state) {
        let t = this;

        Utils.ajaxRequest('GET',
            url + "sales/user/" + this.props.user.id,
            function (data) {
                state.sales = data;

                t.setState(state);
            },
            true,
            {}
        );

    }

    render() {

        return (<div>

            <ul>
                {
                    this.state.sales.map(
                        (sale, index) =>
                            (
                                <li className="list-group-item" key={index}>
                                    <SalesItem sale={sale}/>
                                </li>
                            )
                    )
                }
            </ul>

        </div>);
    }

}

class MenuDash extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.updateUserMode = this.updateUserMode.bind(this);
    }

    logout() {
        stompClient.disconnect();
        socket.close();
        this.props.logoutUser();
    }

    updateUserMode() {
        this.props.updateUserMode(true);
    }

    render() {

        return (
            <div>

                <header>
                    <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse"
                                        data-target="#navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="#">
                                    <div className="logo_img">
                                        <img src="imgs/logo2.png"/>
                                    </div>
                                </a>
                            </div>
                            <div id="navbar-collapse" className="collapse navbar-collapse">
                                <MenuOptions user={this.props.user} logout={this.logout} history={this.props.history}/>
                            </div>
                        </div>
                    </nav>


                </header>
            </div>
        );

    }

}

class Dashboard extends React.Component {


    render() {


        const args = this.props;
        const user = args.user;
        return (
            <div id="content_dashboard">
                <MenuDash user={user} logoutUser={args.logoutUser} updateUserMode={this.updateUserMode}
                          history={this.props.history}/>
                {user.accountType === 1 ?
                    <DashboardArtista
                        user={user}/> :
                    <DashboardBasico user={user}/> }


                <Route path="/dashboard" exact={true} render={() => {
                    return (
                        <Redirect to="/dashboard/gallery"/>
                    );
                }}/>

                <div className="content_wmenu">
                    <Route path="/dashboard/user" exact={true} render={() => {
                        return (
                            <User user={user} updateUser={args.updateUser}/>
                        );
                    }}/>

                    <Route path="/dashboard/gallery" exact={true} render={() => {
                        return (
                            <PublicGallery user={user}/>
                        );
                    }}/>

                    <Route path="/dashboard/pieces/:id" exact={true} render={({match}) => {
                        return (
                            <Piece piece_id={match.params.id} user={user}/>
                        );
                    }}/>

                    <Route path="/dashboard/bid/:id" exact={true} render={({match}) => {
                        return (
                            <Bid bid_id={match.params.id} user={user}/>
                        );
                    }}/>

                    <Route path="/dashboard/mysales" exact={true} render={() => {
                        return (
                            <div>
                                <div class="title_dash">
                                    <h2 className="title tangerine">Vendas</h2>
                                </div>
                                <Sales user={user}/>
                            </div>
                        );
                    }}/>


                    <Route path="/dashboard/mybids" exact={true} render={() => {
                        return (
                            <div>
                                <div className="title_dash">
                                    <h2 className="title tangerine">Meus Bids</h2>
                                </div>
                                <MyBids user={user}/>
                            </div>

                        );
                    }}/>
                </div>

            </div>
        );
    }


}


export default withRouter(Dashboard);
