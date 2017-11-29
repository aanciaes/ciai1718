import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';

import {Route, withRouter, Redirect} from 'react-router-dom'
import LandingPage from './landingpage/landingPage';
import Dashboard from './dashboard/dashboard';
import PublicGallery from './publicGallery/publicGallery';
import Piece from './piece/piece';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Config from './config/config';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
const bootstrap = require('bootstrap');
var Typeahead = require('react-bootstrap-typeahead').Typeahead;


const url = Config.url;


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorLogin: false,
            users: [],
            user: "",
            // landingPageMode: true,
            //galleryMode: true,
            // piecemode: false,
            piece_id: -1
        };
        this.getCopyState = this.getCopyState.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        //this.getUsers();
        this.props.history.push("/gallery");
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
        let that = this;
        let s = this.state;
        //let us = s.users;

        /*let found = false;
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
         }*/

        $.ajax({
            type: 'POST',
            url: url + "login?username=" + u.email + "&password=" + u.password,
            //contentType: "application/json; charset=utf-8",
            success: function (result) {
                let stateCopy = that.getCopyState(s);
                stateCopy.user = result;
                //stateCopy.loggedIn = true;
                // stateCopy.landingPageMode = false;
                that.setState(stateCopy);
                that.props.history.push('/dashboard');
            },
            error: function (status) {
                let stateCopy = that.getCopyState(s);
                stateCopy.errorLogin = true;
                console.log(status);
                that.setState(stateCopy);
            }
        });

        return true;
    }

    logoutUser() {
        let stateCopy = this.getCopyState(this.state);
        /*stateCopy.user_id = "";
         stateCopy.loggedIn = false;
         stateCopy.landingPageMode = true;*/
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
                    <img id="body_img" src="imgs/body/body.jpg"/>

                    <Route path="/" render={() => {
                        return (
                            <LandingPage loginUser={this.loginUser} addUser={this.addUser} errorLogin={this.state.errorLogin}/>

                        )
                    }

                    }/>

                    <Route path="/dashboard" render={() => {
                        return (
                            <Dashboard user={this.state.user}
                                       logoutUser={this.logoutUser}
                                       updateUser={this.updateUser} getCopyState={this.getCopyState}/>
                        );
                    }}/>

                    <Route path="/gallery" exact={true} render={() => {
                        return (
                            <PublicGallery/>
                        );
                    }}/>

                    <Route path="/pieces/:id" exact={true} render={({match}) => {
                        return (
                            <Piece piece_id={match.params.id}/>
                        );
                    }}/>


                </div>
            </div>

        );
    }
}

export default withRouter(App);
