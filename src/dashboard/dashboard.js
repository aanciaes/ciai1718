/**
 * Created by Tecnico on 09/11/2017.
 */

import React, {Component} from 'react';

import {BrowserRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom'
import PublicGallery from '../publicGallery/publicGallery';


const MenuDash = () =>
    <div>

        <header className="App-header">
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">ArtBiz</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">User<span className="glyphicon glyphicon-user"></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>


    </div>


class Dashboard extends React.Component {


    render() {
        return (
            <div>
                <MenuDash/>
            </div>
        );
    }


}


export default Dashboard;
