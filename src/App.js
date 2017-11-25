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
var Typeahead = require('react-bootstrap-typeahead').Typeahead;


function GalleryControl(props) {
    if (props.galleryMode) {
        return (<PublicGallery/>)
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
            landingPageMode: true,
            galleryMode: true
        };
        this.getCopyState = this.getCopyState.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updateGallery = this.updateGallery.bind(this);
        this.getUsers();
    }


    getUsers() {
        let that = this;
        $.getJSON('jsonSchemas/data/Users.json', function (data) {
            let stateCopy = that.getCopyState(that.state);
            stateCopy.users = data;
            console.log(data);
            that.setState(stateCopy);
        });
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

    updateGallery(g) {
        let stateCopy = this.getCopyState(this.state);
        stateCopy.galleryMode = g;
        this.setState(stateCopy);
    }

    render() {


        return (


            <div className="App">
                <div className="container">
                    <img id="body_img" src="imgs/body/body.jpg"/>

                    <Route path="/" render={() => {
                        return (
                            <LandingPage loginUser={this.loginUser} addUser={this.addUser}
                                         updateGallery={this.updateGallery}/>
                        )
                    }

                    }/>

                    <Route path="/dashboard" render={() => {
                        return (
                            <Dashboard user_id={this.state.user_id} users={this.state.users}
                                       logoutUser={this.logoutUser}
                                       updateUser={this.updateUser} getCopyState={this.getCopyState}
                                       updateGallery={this.updateGallery}/>
                        );
                    }}/>

                    <GalleryControl galleryMode={this.state.galleryMode}/>


                </div>
            </div>

        );
    }
}

export default withRouter(App);
