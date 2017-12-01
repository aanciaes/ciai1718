/**
 * Created by Tecnico on 09/11/2017.
 */
import React, {Component, PropTypes}from 'react';
import {Route, Link, withRouter} from 'react-router-dom'
import './landingPage.css';
import Config from '../config/config';
import $ from 'jquery';
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
        )
    }

    recordUser(e, inputData) {
        e.preventDefault();
        this.props.addUser(this.state);
    }

    render() {
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
                                            <div className="btn-group" data-toggle="buttons">
                                                <label class="btn btn-light active">
                                                    <input type="radio" name="accountType"
                                                           value="0"
                                                           onChange={this.handleChange}
                                                           required="required" checked="checked"/> Básico
                                                </label>
                                                <label class="btn btn-light">
                                                    <input type="radio" name="accountType"
                                                           value="1"
                                                           onChange={this.handleChange}
                                                           required="required"/> Artista
                                                </label>
                                            </div>
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
                    (props.error ? <Error message="Email e password Errados!!!"/> : "" )
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
        this.registerMode = this.registerMode.bind(this);
        this.loginMode = this.loginMode.bind(this);
    }

    registerMode() {
        this.props.updateRegister(true);

    }

    loginMode() {
        this.props.updateLogin(true);

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
                                    <li className="active"><Link to={"/register"}> Registar</Link></li>
                                    <li><Link to={"/login"}>Login</Link></li>
                                    <li><Link to={"/gallery"}>Galeria Pública</Link></li>
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
        this.updateRegister = this.updateRegister.bind(this);
        this.updateLogin = this.updateLogin.bind(this);
        this.updateGallery = this.updateGallery.bind(this);

    }

    getInitialState() {
        this.props.history.push("/");
        return {
            added: false,
            register: false,
            login: false,
            gallery: false,
            error: false
        };
    }


    addUser(u) {
        let s = this.state;
        s.added = true;
        this.props.addUser(u);
        this.setState(s);
    }

    updateRegister(r) {
        let s = this.getInitialState();
        s.register = r;
        this.setState(s);
    }

    updateGallery(r) {
        let s = this.getInitialState();

        this.props.updateGallery(r);
        this.setState(s);
    }

    updateLogin(r) {
        let s = this.getInitialState();
        s.login = r;
        this.setState(s);
    }

    reset() {
        this.setState(this.getInitialState());

    }

    loginUser(u) {
        // this.reset();
        this.props.loginUser(u);
    }


    render() {

        const s = this.state;


        return (
            <div>
                <MenuComponent route={this.props.route} updateRegister={this.updateRegister}
                               updateLogin={this.updateLogin}
                               updateGallery={this.updateGallery}/>

                <Route path="/login" exact={true} render={() => {
                    return (
                        <div>

                            {
                                (this.props.errorLogin ? <Error message="Email e password Errados!!!"/> : "" )
                            }
                            <LoginUtilizador loginUser={this.loginUser}/>

                        </div>
                    );
                }}/>

                <Route path="/register" exact={true} render={() => {
                    return (
                        <div>

                            {
                                (this.props.added != null && this.props.added ?
                                    <Sucesso message="Criação com sucesso!!"/> :
                                    <RegistarUtilizador addUser={this.addUser}/> )
                            }
                        </div>
                    );
                }}/>


            </div>
        );
    }

}

export default withRouter(LandingPage);
