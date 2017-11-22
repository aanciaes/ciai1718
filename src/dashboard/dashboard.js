/**
 * Created by Tecnico on 09/11/2017.
 */
import {withRouter} from 'react-router-dom'

import React, {Component} from 'react';
import User from './user';
import DashboardArtista from './dashboardArtista';
import DashboardBasico from './dashboardBasico';
import './dashboard.css';
import PublicGallery from '../publicGallery/publicGallery';
import Piece from '../piece/piece';

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
                                        <a id="flag" href="#" className="dropdown-toggle count-info"
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
                                        <a id="user-profile" href="#" className="dropdown-toggle"
                                           data-toggle="dropdown"><img
                                            className="img-responsive img-thumbnail img-circle"/>
                                            {this.props.user.name}</a>
                                        <ul className="dropdown-menu dropdown-block" role="menu">
                                            <li>
                                                <a onClick={this.updateUserMode}>
                                                    <div>
                                                        <i className="fa fa-user"></i> Perfil
                                                    </div>
                                                </a>
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


function GalleryControl(props) {
    if (props.gallery) {
        return (<PublicGallery/>);
    }
    return null;
}

function PieceControl(props) {
    if (props.piecemode) {
        return (<Piece/>);
    }
    return null;
}

function UserControl(props) {
    if (props.usermode) {
        return (<User user={props.user} updateUser={props.updateUser}/>)
    }
    return null;
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usermode: false,
            gallery: true,
            piecemode: false
        };

        this.getInitialState = this.getInitialState.bind(this);
        this.updateUserMode = this.updateUserMode.bind(this);
        this.updateGallery = this.updateGallery.bind(this);
        this.updatePieceMode = this.updatePieceMode.bind(this);
        this.resetDashboard = this.resetDashboard.bind(this);

    }


    getInitialState() {
        return {
            usermode: false,
            gallery: false,
            piecemode: false
        };
    }

    resetDashboard() {
        this.setState(this.getInitialState());
    }

    updateGallery(r) {
        let s = this.getInitialState();
        s.gallery = r;
        this.setState(s);
    }

    updatePieceMode(r) {
        let s = this.getInitialState();
        s.piecemode = r;
        this.setState(s);
    }

    updateUserMode(u) {
        let s = this.getInitialState();
        s.usermode = u;
        this.setState(s);

    }


    render() {

        const user = this.props.users[this.props.user_id];
        const s = this.state;
        const args = this.props;
        return (
            <div>
                <MenuDash user={user} logoutUser={args.logoutUser} updateUserMode={this.updateUserMode}/>
                {user.type == 1 ?
                    <DashboardArtista gallery={s.gallery} usermode={s.usermode} piecemode={s.piecemode} updateGallery={this.updateGallery}
                                      resetDashboard={this.resetDashboard}
                                      user={user} updatePieceMode={this.updatePieceMode}/> :
                    <DashboardBasico usermode={s.usermode} gallery={s.gallery} piecemode={s.piecemode} resetDashboard={this.resetDashboard}
                                     updateGallery={this.updateGallery} updatePieceMode={this.updatePieceMode}/> }


                <div className="content_wmenu">
                    <GalleryControl gallery={s.gallery}/>
                    <UserControl usermode={s.usermode} user={user} updateUser={args.updateUser}/>
                    <PieceControl piecemode={s.piecemode}/>
                </div>

            </div>
        );
    }


}


export default withRouter(Dashboard);
