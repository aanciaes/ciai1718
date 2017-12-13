/**
 * Created by Tecnico on 09/11/2017.
 */
import React, {Component, PropTypes}from 'react';
import {Route, Link, withRouter} from 'react-router-dom'
import './landingPage.css';
import Config from '../config/config';
import $ from 'jquery';

import PublicGallery from '../publicGallery/publicGallery';
import Piece from '../piece/piece';
const url = Config.url;


const Error = ({message}) =>
    <div>
        <div className="alert alert-danger">
            <strong>Erro!</strong> {message}
        </div>
    </div>;

const Sucesso = ({message}) =>
    <div>
        <div className="alert alert-success">
            <strong>Sucesso!</strong> {message}
        </div>
    </div>;


class RegistarUtilizador extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            password: "",
            accountType: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.recordUser = this.recordUser.bind(this);
    }

    handleChange({target}) {
        this.setState({
                [target.name]: target.value
            }
        );


    }

    recordUser(e, inputData) {
        e.preventDefault();
        this.props.addUser(this.state);
    }

    render() {
        console.log(this.state);
        return (
            <div className="forms">
                <section>

                    <div className="content_form">

                        <div className="header_form">
                            <h5 className="tangerine">Registar</h5>
                        </div>
                        <div className="content">
                            <form id="form_register" className="form-horizontal form_normal" onSubmit={this.recordUser}>
                                <div className="form-group">

                                    <div className="input-group form_input ">
                                        <span className="input-group-addon">  Nome</span>
                                        <input type="text" className="form-control" name="name"
                                               placeholder="Inserir nome" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="form-group">

                                    <div className="input-group form_input ">
                                        <span className="input-group-addon"> Email</span>
                                        <input type="email" className="form-control" name="email"
                                               aria-describedby="emailHelp"
                                               placeholder="Inserir email" onChange={this.handleChange}
                                               required="required"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group form_input ">
                                        <span className="input-group-addon">Password</span>
                                        <input type="password" className="form-control" name="password"
                                               placeholder="Inserir Password" onChange={this.handleChange}
                                               required="required"/>
                                    </div>
                                </div>


                                <div className="form-group">


                                    <div className="input-group form_input ">
                                        <span className="input-group-addon"> Tipo de Utilizador</span>
                                        <div>

                                            <label className="radio-inline">
                                                <input type="radio" name="accountType" value="0"
                                                       onChange={this.handleChange} checked="checked"/>Básico
                                            </label>
                                            <label className="radio-inline">
                                                <input type="radio" name="accountType" onChange={this.handleChange}
                                                       value="1"/>Artista
                                            </label>

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary" type="submit">Registar</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </section>

            </div>

        )
    }

}


class LoginUtilizador extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            type: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange({target}) {
        this.setState({
                [target.name]: target.value
            }
        )
    }

    login(e, inputData) {
        e.preventDefault();
        this.props.loginUser(this.state);
    }

    render() {
        return (
            <div className="forms">
                <section>

                    <div className="content_form">
                        <div className="header_form">
                            <h5 className="tangerine">Login</h5>
                        </div>
                        <div className="content">
                            <form id="form_login" className="form_normal" onSubmit={this.login}>
                                <div className="form-group">

                                    <div className="input-group form_input">
                                        <span className="input-group-addon">Email</span>
                                        <input type="email" className="form-control" name="email"
                                               aria-describedby="emailHelp"
                                               placeholder="Enter email" onChange={this.handleChange}
                                               required="required"/>
                                    </div>
                                </div>
                                <div className="form-group">

                                    <div className="input-group form_input ">
                                        <span className="input-group-addon">Password</span>
                                        <input type="password" className="form-control" name="password"
                                               placeholder="Password" onChange={this.handleChange} required="required"/>
                                    </div>


                                </div>
                                <div className="form-group">
                                    <div className="row">

                                        <div className="col-md-12 col-xs-12">
                                            <button type="submit" className="btn btn-primary">Entrar</button>
                                        </div>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>


                </section>

            </div>

        )
    }

}


function RegisterControl(props) {
    if (props.register) {
        if (props.added)
            return (<Sucesso message="Criação com sucesso!!"/>);

        return (<RegistarUtilizador addUser={props.addUser}/>);


    }
    return null;
}

function LoginControl(props) {
    if (props.login) {
        return (
            <div>
                {
                    (props.errorLogin ? <Error message="Email e password Errados!!!"/> : "" )
                }
                <LoginUtilizador loginUser={props.loginUser}/>
            </div>
        );

    }
    return null;
}


class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "3"
        };
        this.changeActive = this.changeActive.bind(this);
    }


    changeActive(i) {
        this.props.reset();
        let s = this.state;
        s.active = i;
        switch (i) {
            case 1:
                this.props.showRegister();
                break;
            case 2:
                this.props.showLogin();
                break;

        }
        this.setState(s);
    }


    render() {
        return ( <div>

                <header>
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
                                <a className="navbar-brand">
                                    <div className="logo_img">
                                        <img src="imgs/logo2.png"/>
                                    </div>

                                </a>
                            </div>
                            <div id="navbar" className="navbar-collapse collapse">
                                <ul id="landing_nav" className="nav navbar-nav navbar-right">
                                    <li className={this.state.active == 1 ? "active" : ""}>
                                        <a
                                            onClick={() => this.changeActive(1)}>
                                            Registar</a></li>
                                    <li className={this.state.active == 2 ? "active" : ""}>
                                        <a
                                            onClick={() => this.changeActive(2)}>Login</a>
                                    </li>
                                    <li className={this.state.active == 3 ? "active" : ""}>
                                        <Link to={"/landing/gallery"}
                                              onClick={() => this.changeActive(3)}>Galeria
                                            Pública</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>


            </div>
        );
    }
}


class LandingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            added: false,
            register: false,
            login: false,
            error: false
        };
        this.getInitialState = this.getInitialState.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reset = this.reset.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.showRegister = this.showRegister.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.props.history.push("/landing/gallery");

    }

    getInitialState() {
        this.props.history.push("/landing");
        return {
            register: false,
            login: false,
            gallery: false,
        };
    }


    addUser(u) {
        let s = this.state;
        s.added = true;
        this.props.addUser(u);
        this.setState(s);
    }

    showRegister() {

        let s = this.getInitialState();
        s.register = true;
        this.setState(s);
    }

    showLogin() {
        let s = this.getInitialState();
        s.login = true;
        this.setState(s);
    }

    reset() {
        let s = this.state;
        s.register = false;
        s.login = false;
        this.props.changeState({errorLogin: false, added: false})
        this.setState(s);

    }

    loginUser(u) {
        this.props.loginUser(u);
    }


    render() {

        const s = this.state;


        return (
            <div>
                <MenuComponent route={this.props.route}
                               reset={this.reset} showLogin={this.showLogin} showRegister={this.showRegister}/>

                <LoginControl login={this.state.login} loginUser={this.loginUser}
                              errorLogin={this.props.errorLogin}/>

                <RegisterControl register={this.state.register} added={this.props.added} addUser={this.addUser}/>

                <Route path="/landing/gallery" render={() => {
                    return (
                        <PublicGallery/>
                    );
                }}/>

                <Route path="/landing/pieces/:id" exact={true} render={({match}) => {
                    return (
                        <Piece piece_id={match.params.id}/>
                    );
                }}/>

            </div>
        );
    }

}

export default withRouter(LandingPage);
