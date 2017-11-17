/**
 * Created by Tecnico on 09/11/2017.
 */
import {Route, Link, withRouter} from 'react-router-dom'
import React, {Component} from 'react';
import User from './user';
import './dashboard.css';
import $ from 'jquery';

class CriarPeca extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            date: "",
            techniques: "",
            description: "",
            keywords: []

        };
        this.handleChange = this.handleChange.bind(this);

        $("select[name='keywords']").select2({
            theme: "bootstrap"
        });
    }

    handleChange({target}) {
        let s = this.state;
        s[target.name] = target.value;
        this.setState(s);
    }

    render() {
        return (
            <div>
                <section>

                    <form id="form_register" onSubmit={this.updateUser}>
                        <h2>Criar Peça</h2>
                        <div className="form-group">
                            <label>Nome:</label>
                            <input type="text" className="form-control" name="name"
                                   placeholder="Inserir nome" onChange={this.handleChange} required="required"/>
                        </div>
                        <div className="form-group">
                            <label>Data:</label>
                            <input type="date" className="form-control" name="date"
                                   placeholder="Inserir Data" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Técnicas</label>
                            <input type="text" className="form-control" name="password"
                                   placeholder="Inserir Password" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Descrição textual</label>
                            <textarea name="description" className="form-control"
                                      onChange={this.handleChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Keywords</label>
                            <select name="keywords" multiple="multiple" onChange={this.handleChange}>
                                <option value="art">Art</option>
                                <option value="air">Air</option>
                                <option value="Nature">Nature</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">Criar</button>
                        </div>

                    </form>
                </section>

            </div>

        )
    }

}


class MenuAsideArtista extends React.Component {

    constructor(props) {
        super(props);
        this.updateCreatePiece = this.updateCreatePiece.bind(this);
    }

    updateCreatePiece() {

        this.props.updateCreatePiece(true);
    }

    render() {

        return (<div id="wrapper">
            <div id="sidebar-wrapper">
                <aside id="sidebar">
                    <ul id="sidemenu" className="sidebar-nav">
                        <li>
                            <a onClick={this.props.resetDashboard}>
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
                                <li><a onClick={this.updateCreatePiece}><i className="fa fa-caret-right"></i>Nova
                                    Peça</a></li>
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


function CriarPecaControl(props) {
    if (props.createpiece) {
        return (
            <div>
                <CriarPeca/>
            </div>);
    }
    return null;

}


class DashboardArtista extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usermode: false,
            createpiece: false
        };

        this.getInitialState = this.getInitialState.bind(this);
        this.updateCreatePiece = this.updateCreatePiece.bind(this);

    }


    getInitialState() {
        return {
            usermode: false,
            createpiece: false
        };
    }

    updateCreatePiece(p) {
        this.props.resetDashboard();
        let s = this.getInitialState();
        s.createpiece = p;
        this.setState(s);
    }

    render() {
        return (
            <div>
                <CriarPecaControl createpiece={this.state.createpiece}/>
                <MenuAsideArtista resetDashboard={this.props.resetDashboard}
                                  updateCreatePiece={this.updateCreatePiece}/>

            </div>
        );
    }


}


export default withRouter(DashboardArtista);
