/**
 * Created by Tecnico on 09/11/2017.
 */
import React, {Component} from 'react';
import {BrowserRouter, Router, Route, Switch, Redirect, Link, withRouter} from 'react-router-dom'
import './landingPage.css';
import PublicGallery from '../publicGallery/publicGallery';
import $ from 'jquery';


const MenuComponent = () =>
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
                            <li><Link to={`/register`}> Registar</Link></li>
                            <li><Link to={`/login`}>Login</Link></li>
                            <li><Link to={`/gallery`}>Galeria Pública</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>


    </div>

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

function ErrorLogin(props) {
    if (props.error) {
        let m = "Email ou password errado!!";
        return <Error message={m}/>
    }
    return null;
}

class RegistarUtilizador extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            type: ""
        }

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
            <div>
                <section>
                    <h1>Registar</h1>
                    <form id="form_register" onSubmit={this.recordUser}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email"
                                   aria-describedby="emailHelp"
                                   placeholder="Enter email" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password"
                                   placeholder="Password" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <div>
                                <label>Tipo Utilizador</label>
                            </div>
                            <div>
                                <label className="radio-inline"><input type="radio" name="type"
                                                                       value="0"
                                                                       onChange={this.handleChange}/>Básico</label>
                                <label className="radio-inline"><input type="radio" name="type"
                                                                       value="1"
                                                                       onChange={this.handleChange}/>Artista</label>
                            </div>

                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">Registar</button>
                        </div>

                    </form>
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
        }

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
            <div>
                <section>
                    <h1>Login</h1>
                    <form id="form_login" onSubmit={this.login}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email"
                                   aria-describedby="emailHelp"
                                   placeholder="Enter email" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password"
                                   placeholder="Password" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">Entrar</button>
                        </div>

                    </form>
                </section>

            </div>

        )
    }

}


class UserControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users,
            added: false,
            loggedIn: false,
            error: false
        };
        this.addUser = this.addUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    addUser(u) {
        let s = this.state;
        let us = s.users;
        us.push(u);
        s.users = us;
        s.added = true;
        this.setState(s);


    }

    loginUser(u) {
        let s = this.state;
        let us = s.users;

        console.log(u);
        console.log(us);
        let found = false;
        $.each(us, function (i, val) {
            if (val.email == u.email)
                if (val.password == u.password) {
                    found = true;
                    return false;
                }
        });


        if (!found)
            s.error = true;
        else
            s.loggedIn = true;

        this.props.updateState(s);
    }

    render() {

        const added = this.state.added;
        const loggedIn = this.state.loggedIn;
        console.log(this.state.users);

        if (loggedIn) {
            return (<Redirect to="/dashboard"/>);
        }

        return (
            <div>

                <Route path="/register" render={() => {


                    return (
                        <div>
                            {added ? (
                                <Sucesso message="Criado com sucesso"/>
                            ) : (
                                <RegistarUtilizador addUser={this.addUser}/>
                            )}

                        </div>

                    );
                }}/>


                <Route path="/login" render={() => {

                    return (
                        <div>
                            <ErrorLogin error={this.state.error}/>
                            <LoginUtilizador loginUser={this.loginUser}/>
                        </div>

                    );
                }}/>

            </div>
        );
    }

}


class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: false,
            loggedIn: false
        };
    }

    render() {
        return (
            <div>
                <MenuComponent/>
                <UserControl users={this.state.users} updateState={this.props.updateState}/>
                <Route path="/gallery" render={() => {

                    return (
                        <div>
                            <PublicGallery/>
                        </div>
                    );
                }}/>
            </div>
        );
    }
}

export default LandingPage;
