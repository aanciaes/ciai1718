import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';

import {BrowserRouter, Router, Route, Switch, Redirect, Link, withRouter} from 'react-router-dom'
import LandingPage from './landingpage/landingPage';
import Dashboard from './dashboard/dashboard';
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
            user: {
                email: "",
                type: ""
            }
        };
        this.updateState = this.updateState.bind(this);
    }

    updateState(s) {
        this.setState(s);
    }

    render() {

        const loggedIn = this.state.loggedIn;
        return (


            <div className="App">
                <div className="container">


                    <Route path="/" render={() => {
                        return (<LandingPage updateState={this.updateState} parent={this.props}/>)
                    }

                    }/>

                    <Route path="/dashboard"  render={() => {
                        return (
                            <Dashboard />
                        );
                    }}/>

                </div>
            </div>

        );
    }
}

export default withRouter(App);
