/**
 * Created by Tecnico on 09/11/2017.
 */

import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'

const types = {
    0: 'Basico',
    1: 'Artista'
}


class DetalheUtilizador extends React.Component {
    constructor(props) {
        super(props);
        this.editMode = this.editMode.bind(this);
    }

    editMode() {
        this.props.updateEdit(true);
    }

    render() {
        return (
            <div>
                <h2>Perfil</h2>
                <div>
                    <a href="#" onClick={this.editMode}>Editar</a>
                    <p>Name:{this.props.user.name}</p>
                    <p>Email:{this.props.user.email}</p>
                    <p>Tipo:{types[this.props.user.type]}</p>
                </div>
            </div>

        )
    }

}


class EditarUtilizador extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    handleChange({target}) {
        let s = this.state;
        s.user[target.name] = target.value;
        this.setState(s);
    }

    updateUser(e, inputData) {
        e.preventDefault();
        this.props.updateUser(this.state.user);
    }

    render() {
        return (
            <div>
                <section>
                    <h2>Editar Utilizador</h2>
                    <form id="form_register" onSubmit={this.updateUser}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" className="form-control" name="name"
                                   placeholder="Inserir nome" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password"
                                   placeholder="Inserir Password" onChange={this.handleChange}/>
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
                            <button type="submit" className="btn btn-primary">Editar</button>
                        </div>

                    </form>
                </section>

            </div>

        )
    }

}

function EditControl(props) {
    if (props.edit) {
        return (<EditarUtilizador user={props.user} updateUser={props.updateUser}/>);
    }
    return null;
}

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
        this.updateEdit = this.updateEdit.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.reset = this.reset.bind(this);
    }

    updateEdit(e) {

        let s = this.getInitialState();
        s.edit = e;
        this.setState(s);

    }

    getInitialState() {
        return {
            edit: false
        };
    }

    reset() {
        this.setState(this.getInitialState);
    }

    updateUser(u) {
        if (this.props.updateUser(u.id, u) == true) {
            this.reset();
        }
    }

    render() {
        return (
            <div>

                <div className="row">
                    <div className="col-md-6">
                        <DetalheUtilizador user={this.props.user} updateEdit={this.updateEdit}/>
                    </div>
                    <div className="col-md-6">
                        <EditControl edit={this.state.edit} user={this.props.user} updateUser={this.updateUser}/>
                    </div>
                </div>


            </div>
        );
    }


}

export default User;
