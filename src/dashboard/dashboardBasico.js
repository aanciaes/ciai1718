/**
 * Created by Tecnico on 09/11/2017.
 */
import {Route, Link, withRouter} from 'react-router-dom'
import React, {Component} from 'react';
import User from './user';
import './dashboard.css';


class MenuAsideBasico extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (<div id="wrapper">
            <div id="sidebar-wrapper">
                <aside id="sidebar">
                    <ul id="sidemenu" className="sidebar-nav">
                        <li>
                            <a href="#">
                                <span className="sidebar-icon"><i className="fa fa-dashboard"></i></span>
                                <span className="sidebar-title">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="sidebar-icon"><i className="fa fa-film"></i></span>
                                <span className="sidebar-title">Galeria Pública</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="sidebar-icon"><i className="fa fa-money"></i></span>
                                <span className="sidebar-title">Bids</span>
                            </a>
                        </li>
                    </ul>
                </aside>
            </div>
            <main id="page-content-wrapper" role="main">
            </main>
        </div>);
    }

}


class DashboardBasico extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usermode: false
        };

        this.getInitialState = this.getInitialState.bind(this);

    }

    getInitialState() {
        return {
            usermode: false
        };
    }

    render() {
        return (
            <div>
                <MenuAsideBasico/>
            </div>
        );
    }


}


export default withRouter(DashboardBasico);
