/**
 * Created by Tecnico on 09/11/2017.
 */
import {Route, Link, withRouter} from 'react-router-dom'
import React, {Component} from 'react';
import './dashboard.css';
import $ from 'jquery';
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
        $.get(url + "bid/user/" + this.props.user.id, function (data) {
            state.bids = data;
            console.log(data);
            t.setState(state);
        });
    }

    render() {

        return (<div>

            <ul>
                {
                    this.state.bids.map(
                        (bid, index) =>
                            (
                                <li className="list-group-item" key={index}>
                                    <Link to={"/dashboard/bid/" + bid.bid.bidId}>
                                        <BidItem bid={bid.bid}/>
                                    </Link>
                                </li>
                            )
                    )
                }
            </ul>

        </div>);
    }

}


class MenuAsideBasico extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (<div id="wrapper">
            <div id="sidebar-wrapper">
                <aside id="sidebar">
                    <ul id="sidemenu" className="sidebar-nav">
                        <li>
                            <Link to={"/dashboard"}>
                                <span className="sidebar-icon"><i className="fa fa-dashboard"></i></span>
                                <span className="sidebar-title">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/gallery">
                                <span className="sidebar-icon"><i className="fa fa-film"></i></span>
                                <span className="sidebar-title">Galeria Pública</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/mybids">
                                <span className="sidebar-icon"><i className="fa fa-money"></i></span>
                                <span className="sidebar-title">Bids</span>
                            </Link>
                        </li>
                    </ul>
                </aside>
            </div>
            <main id="page-content-wrapper" role="main">
            </main>
        </div>);
    }

}


class DashboardBasico extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <MenuAsideBasico/>

                <Route path="/dashboard/mybids" exact={true} render={() => {
                    return (
                        <MeusBids user={this.props.user}/>
                    );
                }}/>
            </div>
        );
    }


}


export default withRouter(DashboardBasico);
