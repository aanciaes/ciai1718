/**
 * Created by Tecnico on 09/11/2017.
 */
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import './landingPage.css';
import PublicGallery from '../publicGallery/publicGallery';


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
            <div className="forms">
                <section>
                    <h1>Registar</h1>
                    <form id="form_register" onSubmit={this.recordUser}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" className="form-control" name="name"
                                   placeholder="Inserir nome" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email"
                                   aria-describedby="emailHelp"
                                   placeholder="Inserir email" onChange={this.handleChange} required="required"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password"
                                   placeholder="Inserir Password" onChange={this.handleChange} required="required"/>
                        </div>
                        <div className="form-group">
                            <div>
                                <label>Tipo Utilizador</label>
                            </div>
                            <div>
                                <label className="radio-inline"><input type="radio" name="type"
                                                                       value="0"
                                                                       onChange={this.handleChange} required="required"/>Básico</label>
                                <label className="radio-inline"><input type="radio" name="type"
                                                                       value="1"
                                                                       onChange={this.handleChange} required="required"/>Artista</label>
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
            <div className="forms">
                <section>
                    <h1>Login</h1>
                    <form id="form_login" onSubmit={this.login}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email"
                                   aria-describedby="emailHelp"
                                   placeholder="Enter email" onChange={this.handleChange} required="required"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password"
                                   placeholder="Password" onChange={this.handleChange} required="required"/>
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

function GalleryControl(props) {
    if (props.gallery) {
        return (<PublicGallery/>);
    }
    return null;
}


class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.registerMode = this.registerMode.bind(this);
        this.loginMode = this.loginMode.bind(this);
        this.galleryMode = this.galleryMode.bind(this);
    }

    registerMode() {
        this.props.updateRegister(true);
    }

    loginMode() {
        this.props.updateLogin(true);
    }

    galleryMode() {
        this.props.updateGallery(true);
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
                            <a className="navbar-brand">ArtBiz</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a onClick={this.registerMode}> Registar</a></li>
                                <li><a onClick={this.loginMode}>Login</a></li>
                                <li><a onClick={this.galleryMode}>Galeria Pública</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>


        </div>);
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
            gallery: false,
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
        s.gallery = r;
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
        this.reset();
        console.log(this.props.loginUser(u));

        if (this.props.loginUser(u) == false) {
            console.log(1);
            let s = Object.assign({}, this.state);
            s.error = true;
            this.setState(s);
        }

    }

    render() {

        const s = this.state;


        return (
            <div>
                <MenuComponent updateRegister={this.updateRegister} updateLogin={this.updateLogin}
                               updateGallery={this.updateGallery}/>


                <RegisterControl added={s.added} register={s.register} addUser={this.addUser}/>
                <LoginControl error={s.error} login={s.login} loginUser={this.loginUser}/>
                <GalleryControl gallery={s.gallery}/>


            </div>
        );
    }

}

export default LandingPage;
