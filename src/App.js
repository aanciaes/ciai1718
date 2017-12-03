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
            added: null,
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
        let that = this;
        $.ajax({
            type: 'POST',
            url: url + "user/register",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(u),
            success: function (result) {
                let stateCopy = that.getCopyState(that.state);
                stateCopy.user = result;
                //stateCopy.loggedIn = true;
                // stateCopy.landingPageMode = false;
                stateCopy.added = true;
                that.setState(stateCopy);
                //that.props.history.push('/');
            },
            error: function (status) {
                let stateCopy = that.getCopyState(that.state);
                stateCopy.added = false;
                console.log(status);
                that.setState(stateCopy);
            }
        });
    }

    loginUser(u) {
        let that = this;
        $.ajax({
            type: 'POST',
            url: url + "login?username=" + u.email + "&password=" + u.password,
            //contentType: "application/json; charset=utf-8",
            success: function (result) {
                let stateCopy = that.getCopyState(that.state);
                stateCopy.user = result;
                //stateCopy.loggedIn = true;
                // stateCopy.landingPageMode = false;
                that.setState(stateCopy);
                that.props.history.push('/dashboard');
            },
            error: function (status) {
                let stateCopy = that.getCopyState(that.state);
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
        this.props.history.push('/gallery');
    }

    updateUser(u) {
        let t = this;
        $.ajax({
            type: 'PUT',
            url: url + "user",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(u),
            success: function (result) {
                let s = t.state;
                s.user = result;
                t.setState(s);
                /* let s = t.state;
                 s.piece = result;
                 s.edit = false;
                 t.setState(s);*/
            },
            error: function (status) {
                alert("Erro " + status);
                console.log(status);
            }
        });
    }


    render() {


        return (


            <div className="App">
                <div className="container">
                    <img id="body_img" src="imgs/body/body.jpg"/>

                    <Route path="/" render={() => {
                        return (
                            <LandingPage loginUser={this.loginUser} addUser={this.addUser}
                                         errorLogin={this.state.errorLogin} added={this.state.added}/>

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
