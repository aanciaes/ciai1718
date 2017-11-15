import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';

import {Route, withRouter} from 'react-router-dom'
import LandingPage from './landingpage/landingPage';
import Dashboard from './dashboard/dashboard';
import PublicGallery from './publicGallery/publicGallery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
const bootstrap = require('bootstrap');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            users: [],
            user_id: ""
        };
        this.getCopyState = this.getCopyState.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    getCopyState() {
        return Object.assign({}, this.state);
    }

    addUser(u) {
        let stateCopy = this.getCopyState();
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

        let stateCopy = this.getCopyState();
        stateCopy.user_id = user;
        stateCopy.loggedIn = true;
        this.setState(stateCopy);
        this.props.history.push('/dashboard');
        return true;
    }

    logoutUser() {
        let stateCopy = this.getCopyState();
        stateCopy.user_id = "";
        stateCopy.loggedIn = false;
        this.setState(stateCopy);
        this.props.history.push('/');
    }

    updateUser(i, u) {
        let stateCopy = this.getCopyState();
        let us = stateCopy.users;
        us[i] = u;
        stateCopy.users = us;
        stateCopy.user = u;
        this.setState(stateCopy);
        this.props.history.push('/dashboard/user/' + i);
        return true;
    }

    render() {


        return (


            <div className="App">
                <div className="container">

                    <Route path="/" render={() => {
                        return (<LandingPage loginUser={this.loginUser} addUser={this.addUser}/>)
                    }

                    }/>

                    <Route path="/dashboard" render={() => {
                        return (
                            <Dashboard user_id={this.state.user_id} users={this.state.users}
                                       logoutUser={this.logoutUser}
                                       updateUser={this.updateUser}/>
                        );
                    }}/>


                </div>
            </div>

        );
    }
}

export default withRouter(App);
