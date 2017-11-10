import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';
import {BrowserRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom'
import LandingPage from './landingpage/landingPage';
import Dashboard from './dashboard/dashboard';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        this.updateState = this.updateState.bind(this);
    }

    updateState(s) {
        this.setState(s);
    }

    render() {

        const loggedIn = this.state.loggedIn;
        return (

            <BrowserRouter>
                <div className="App">
                    <div className="container">


                        <Route path="/" render={() => {
                            if (loggedIn) {
                                return (<Redirect to="/dashboard"/>);
                            }
                            return (<LandingPage updateState={this.updateState}/>)
                        }

                        }/>

                        <Route path="/dashboard" render={() => {
                            return (
                                <Dashboard />
                            );
                        }}/>

                    </div>
                </div>
            </BrowserRouter>

        );
    }
}

export default App;
