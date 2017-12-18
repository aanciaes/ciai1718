import React, {Component} from 'react';
import './App.css';


import {Route, withRouter, Redirect} from 'react-router-dom'
import LandingPage from './landingpage/landingPage';
import Dashboard from './dashboard/dashboard';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Config from './config/config';
import Utils from './utils/utils';
const $ = require('jquery');
window.jQuery = $;
window.$ = $;
global.jQuery = $;
const bootstrap = require('bootstrap');
$.DataTable = require('datatables.net');


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
        this.changeState = this.changeState.bind(this);

    }


    changeState(s) {
        let st = this.state;
        $.each(s, function (i, val) {
            st[i] = val;
        });
        this.setState(st);
    }


    getCopyState(state) {
        return Object.assign({}, state);
    }

    addUser(u) {
        let that = this;

        Utils.ajaxRequest('POST',
            url + "user/register",
            function (result) {
                let stateCopy = that.getCopyState(that.state);
                stateCopy.user = result;
                stateCopy.added = true;
                that.setState(stateCopy);
            },
            true,
            {
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(u)
            }
        );

    }

    loginUser(u) {
        let that = this;

        Utils.ajaxRequest('POST',
            url + "login?username=" + u.email + "&password=" + u.password,
            function (result, textStatus, request) {

                let stateCopy = that.getCopyState(that.state);
                stateCopy.user = result;
                that.setState(stateCopy);
                that.props.history.push('/dashboard');
            },
            true,
            {
                error: function (status) {
                    let stateCopy = that.getCopyState(that.state);
                    stateCopy.errorLogin = true;
                    that.setState(stateCopy);
                }
            }
        );



    }

    logoutUser() {
        let that = this;

        Utils.ajaxRequest('POST',
            url + "logout",
            function (result, textStatus, request) {
                let stateCopy = that.getCopyState(that.state);
                stateCopy.user = "";
                that.setState(stateCopy);
                that.props.history.push('/landing/gallery');
            },
            true,
            {}
        );


    }

    updateUser(u) {
        let t = this;

        Utils.ajaxRequest('PUT',
            url + "user",
            function (result) {

                let s = t.state;
                s.user = result;
                t.setState(s);
            },
            true,
            {
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(u)
            }
        );


    }


    render() {


        return (


            <div className="App">
                <div className="container">

                    <img id="body_img" src="imgs/body/body.jpg"/>



                    <Route path="/" exact={true} render={() => {
                        return (
                            <Redirect to="/landing"/>

                        )
                    }

                    }/>

                    <Route path="/landing" render={() => {
                        return (
                            <LandingPage loginUser={this.loginUser} addUser={this.addUser}
                                         errorLogin={this.state.errorLogin} added={this.state.added}
                                         changeState={this.changeState}/>

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


                </div>
            </div>

        );
    }
}

export default withRouter(App);
