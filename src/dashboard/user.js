/**
 * Created by Tecnico on 09/11/2017.
 */

import React, {Component} from 'react';
import './user.css';


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

                <div id="user_profile">
                    <div className="profile_title tangerine subtitle">Perfil</div>
                    <div className="row">
                        <div className="col-md-3 col-xs-12">
                            <img
                                src="https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"
                                className="img-circle"/>
                        </div>
                        <div className="col-md-9 col-xs-12">
                            <a onClick={this.editMode}><i className="fa fa-edit"></i>Editar</a>
                            <h6>Name:{this.props.user.name}</h6>
                            <h6>Email:{this.props.user.email}</h6>
                            <h6>Tipo:{types[this.props.user.accountType]}</h6>
                        </div>

                    </div>
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
                                   placeholder="Inserir nome" value={this.state.user.name}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email"
                                   placeholder="Inserir email" value={this.state.user.email}
                                   onChange={this.handleChange} required="required"/>
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
                                <label className="radio-inline">
                                    <input type="radio" name="accountType" value="0"
                                           checked={this.state.user.accountType == 0 ? 'checked' : ''}
                                           onChange={this.handleChange} required="required"/>Básico</label>
                                <label className="radio-inline">
                                    <input type="radio" name="accountType" value="1"
                                           checked={this.state.user.accountType == 1 ? 'checked' : ''}
                                           onChange={this.handleChange} required="required"/>Artista</label>
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
        };
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
        this.reset();
        this.props.updateUser(u);
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
