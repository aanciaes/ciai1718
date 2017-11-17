/**
 * Created by Tecnico on 09/11/2017.
 */
import {withRouter} from 'react-router-dom'

import React, {Component} from 'react';
import User from './user';
import DashboardArtista from './dashboardArtista';
import DashboardBasico from './dashboardBasico';
import './dashboard.css';



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
                                <a className="navbar-brand" href="#">Art Biz</a>
                            </div>
                            <div id="navbar-collapse" className="collapse navbar-collapse">
                                <form className="navbar-form navbar-left" role="search">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search"/>
                                        <span className="input-group-btn">
                                    <button className="btn btn-default" type="submit"><span
                                        className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                </span>
                                    </div>
                                </form>
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="dropdown">
                                        <a id="flag" href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <img
                                                src="http://www.country-dialing-codes.net/img/png-country-4x2-fancy-res-1280x960/gb.png"
                                                alt="English" width="28px" height="18px"/>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-flag" role="menu">
                                            <li>
                                                <a href="#">
                                                    <img
                                                        src="http://www.country-dialing-codes.net/img/png-country-4x2-flat-res-640x480/gf.png"
                                                        alt="Français" width="28px" height="18px"/>
                                                    <span>Français</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a id="user-profile" href="#" className="dropdown-toggle"
                                           data-toggle="dropdown"><img
                                            className="img-responsive img-thumbnail img-circle"/>
                                            {this.props.user.name}</a>
                                        <ul className="dropdown-menu dropdown-block" role="menu">
                                            <li><a onClick={this.updateUserMode}>Perfil</a></li>
                                            <li><a onClick={this.logout}>Logout</a></li>
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
            usermode: false
        };

        this.getInitialState = this.getInitialState.bind(this);
        this.updateUserMode = this.updateUserMode.bind(this);
        this.resetDashboard = this.resetDashboard.bind(this);

    }


    getInitialState() {
        return {
            usermode: false
        };
    }

    resetDashboard() {
        this.setState(this.getInitialState());
    }


    updateUserMode(u) {
        let s = this.getInitialState();
        s.usermode = u;
        this.setState(s);

    }


    render() {

        const user = this.props.users[this.props.user_id];
        return (
            <div>
                <MenuDash user={user} logoutUser={this.props.logoutUser} updateUserMode={this.updateUserMode}/>
                {user.type == 1 ? <DashboardArtista usermode={this.state.usermode} resetDashboard={this.resetDashboard} user={user}/> :
                    <DashboardBasico usermode={this.state.usermode} resetDashboard={this.resetDashboard}/> }
                <UserControl usermode={this.state.usermode} user={user} updateUser={this.props.updateUser}/>
            </div>
        );
    }


}


export default withRouter(Dashboard);
