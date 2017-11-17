import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';

import {Route, withRouter} from 'react-router-dom'
import LandingPage from './landingpage/landingPage';
import Dashboard from './dashboard/dashboard';
import PublicGallery from './publicGallery/publicGallery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/select2-bootstrap-theme/dist/select2-bootstrap.min.css';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
const bootstrap = require('bootstrap');


function LandingPageControl(props) {
    if (props.landingPageMode) {
        return (<LandingPage loginUser={props.loginUser} addUser={props.addUser}/>)
    }
    return null;
}

function DashboardPageControl(props) {
    if (!props.landingPageMode) {
        return ( <Dashboard user_id={props.user_id} users={props.users}
                            logoutUser={props.logoutUser}
                            updateUser={props.updateUser} getCopyState={props.getCopyState}/>)
    }
    return null;
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            users: [],
            user_id: "",
            landingPageMode: true
        };
        this.getCopyState = this.getCopyState.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    getCopyState(state) {
        return Object.assign({}, state);
    }

    addUser(u) {
        let stateCopy = this.getCopyState(this.state);
        u.id = stateCopy.users.length;
        stateCopy.users.push(u);
        this.setState(stateCopy);
    }

    loginUser(u) {

        let s = this.state;
        let us = s.users;

        let found = false;
        let user = null;
        $.each(us, function (i, val) {
            if (val.email == u.email)
                if (val.password == u.password) {
                    user = i;
                    found = true;
                    return false;
                }
        });

        if (!found) {
            return false;
        }

        let stateCopy = this.getCopyState(this.state);
        stateCopy.user_id = user;
        stateCopy.loggedIn = true;
        stateCopy.landingPageMode = false;
        this.setState(stateCopy);
        this.props.history.push('/dashboard');
        return true;
    }

    logoutUser() {
        let stateCopy = this.getCopyState(this.state);
        stateCopy.user_id = "";
        stateCopy.loggedIn = false;
        stateCopy.landingPageMode = true;
        this.setState(stateCopy);
        this.props.history.push('/');
    }

    updateUser(i, u) {
        let stateCopy = this.getCopyState(this.state);
        let us = stateCopy.users;
        us[i] = u;
        stateCopy.users = us;
        stateCopy.user = u;
        this.setState(stateCopy);
        return true;
    }

    render() {


        return (


            <div className="App">
                <div className="container">

                    <Route path="/" render={() => {
                        return (
                            <LandingPageControl landingPageMode={this.state.landingPageMode} loginUser={this.loginUser}
                                                addUser={this.addUser}/>)
                    }

                    }/>

                    <Route path="/dashboard" render={() => {
                        return (
                            <DashboardPageControl landingPageMode={this.state.landingPageMode} user_id={this.state.user_id} users={this.state.users}
                                                  logoutUser={this.logoutUser}
                                                  updateUser={this.updateUser} getCopyState={this.getCopyState}/>
                        );
                    }}/>


                </div>
            </div>

        );
    }
}

export default withRouter(App);
