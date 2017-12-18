/**
 * Created by Tecnico on 09/11/2017.
 */
import {Route, Link, withRouter} from 'react-router-dom'
import React, {Component} from 'react';
import './dashboard.css';
import $ from 'jquery';
import Config from '../config/config';
import Utils from '../utils/utils';
const url = Config.url;


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
                            <Link to={"/dashboard"}>
                                <span className="sidebar-icon"><i className="fa fa-dashboard"></i></span>
                                <span className="sidebar-title">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/gallery">
                                <span className="sidebar-icon"><i className="fa fa-film"></i></span>
                                <span className="sidebar-title">Galeria Pública</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/mybids">
                                <span className="sidebar-icon"><i className="fa fa-money"></i></span>
                                <span className="sidebar-title">Bids</span>
                            </Link>
                        </li>
                        <li>
                                <Link to={"/dashboard/mysales"}>
                                    <span className="sidebar-icon"><i className="fa fa-money"></i></span>
                                    <span className="sidebar-title">Vendas</span>
                                </Link>
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
