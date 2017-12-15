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
import $ from 'jquery';
import Utils from '../utils/utils';
import Config from '../config/config';

const url = Config.url;



const BidItem = ({bid})=>
    <div>
        <p>Id: {bid.bidId}</p>
        <p>Amount:{bid.bidAmount}</p>
        <p>Piece:{bid.pieceId}</p>
    </div>;



class MeusBids extends React.Component {

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
        if(this.props.user.accountType == 0)
            u = url + "bid/user/" + this.props.user.id;

        Utils.ajaxRequest('GET',
           u,
            function (data) {
                state.bids = data;
                console.log(data);
                t.setState(state);
            },
            true,
            {}
        );
        /* $.get(url + "bid/user/" + this.props.user.id, function (data) {
         state.bids = data;
         console.log(data);
         t.setState(state);
         });*/
    }

    render() {

        return (<div>

            <ul>
                {
                    this.state.bids.map(
                        (bid, index) =>
                            (
                                <li className="list-group-item" key={index}>
                                    <Link to={"/dashboard/bid/" + bid.bidId}>
                                        <BidItem bid={bid}/>
                                    </Link>
                                </li>
                            )
                    )
                }
            </ul>

        </div>);
    }

}



const SalesItem = ({sale})=>
    <div>
        <p>BId: {sale.bidId}</p>
        <p>Date:{sale.dateOfSale}</p>
        <p>SalesId:{sale.saleId}</p>
    </div>;


class Vendas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sales: []
        };

        // this.getMySales(this.state);

    }

    componentDidMount(){
        this.getMySales(this.state);
    }

    getMySales(state) {
        let t = this;

        Utils.ajaxRequest('GET',
            url + "sales/user/" + this.props.user.id,
            function (data) {
                state.sales = data;
                console.log(data);
                t.setState(state);
            },
            true,
            {}
        );
        /* $.get(url + "bid/user/" + this.props.user.id, function (data) {
         state.bids = data;
         console.log(data);
         t.setState(state);
         });*/
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
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="dropdown">
                                        <a id="flag"  className="dropdown-toggle count-info"
                                           data-toggle="dropdown">
                                            <i className="fa fa-envelope"></i>
                                            <span className="count label label-primary">8</span>
                                        </a>
                                        <ul className="dropdown-menu dropdown-alerts">
                                            <li>
                                                <a href="mailbox.html">
                                                    <div>
                                                        <i className="fa fa-envelope fa-fw"></i> You have 16 messages
                                                        <span
                                                            className="pull-right text-muted small">4 minutes ago</span>
                                                    </div>
                                                </a>
                                                <div className="clear"></div>
                                            </li>
                                            <li className="divider"></li>
                                            <li>
                                                <a href="profile.html">
                                                    <div>
                                                        <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                                                        <span
                                                            className="pull-right text-muted small">12 minutes ago</span>
                                                    </div>
                                                </a>
                                                <div className="clear"></div>
                                            </li>
                                            <li className="divider"></li>
                                            <li>
                                                <a href="grid_options.html">
                                                    <div>
                                                        <i className="fa fa-upload fa-fw"></i> Server Rebooted
                                                        <span
                                                            className="pull-right text-muted small">4 minutes ago</span>
                                                    </div>
                                                </a>
                                                <div className="clear"></div>
                                            </li>
                                            <li className="divider"></li>
                                            <li>
                                                <div className="text-center link-block">
                                                    <a href="notifications.html">
                                                        <strong>See All Alerts</strong>
                                                        <i className="fa fa-angle-right"></i>
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a id="user-profile"  className="dropdown-toggle"
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
                                                <a onClick={this.logout}>
                                                    <div>
                                                        <i className="fa fa-sign-out"></i> Logout
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
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
                <MenuDash user={user} logoutUser={args.logoutUser} updateUserMode={this.updateUserMode}/>
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
                            <Vendas user={user}/>
                        );
                    }}/>


                    <Route path="/dashboard/mybids" exact={true} render={() => {
                        return (
                            <MeusBids user={user}/>
                        );
                    }}/>
                </div>

            </div>
        );
    }


}


export default withRouter(Dashboard);
