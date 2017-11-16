/**
 * Created by Tecnico on 09/11/2017.
 */
import {Route, Link, withRouter} from 'react-router-dom'
import React, {Component} from 'react';
import User from './user';
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

                <header className="App-header">
                    <nav className="navbar navbar-default navbar-fixed-top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                        data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="#">ArtBiz</a>
                            </div>
                            <div id="navbar" className="navbar-collapse collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <a onClick={this.updateUserMode}> {this.props.user.name}<span
                                            className="glyphicon glyphicon-user"></span></a>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                <span className="glyphicon glyphicon-chevron-down"></span>
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" onClick={this.logout}>Logout</a>
                                            </div>
                                        </div>
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

    }

    getInitialState() {
        return {
            usermode: false
        };
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

                <UserControl usermode={this.state.usermode} user={user} updateUser={this.props.updateUser}/>

            </div>
        );
    }


}


export default withRouter(Dashboard);
