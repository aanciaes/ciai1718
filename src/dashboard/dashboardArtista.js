/**
 * Created by Tecnico on 09/11/2017.
 */
import {Route, Link, withRouter} from 'react-router-dom'
import React, {Component} from 'react';
import User from './user';
import './dashboard.css';


class MenuAsideArtista extends React.Component {

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
                            <a className="accordion-toggle collapsed toggle-switch" data-toggle="collapse"
                               href="#submenu-2">
                                <span className="sidebar-icon"><i className="fa fa-cubes"></i></span>
                                <span className="sidebar-title">Peça</span>
                                <b className="caret"></b>
                            </a>
                            <ul id="submenu-2" className="panel-collapse collapse panel-switch" role="menu">
                                <li><a href="#"><i className="fa fa-caret-right"></i>Nova Peça</a></li>
                                <li><a href="#"><i className="fa fa-caret-right"></i>Minha Galeria</a></li>
                            </ul>
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


class DashboardArtista extends React.Component {

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
                <MenuAsideArtista/>
            </div>
        );
    }


}


export default withRouter(DashboardArtista);
