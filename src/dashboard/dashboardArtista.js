/**
 * Created by Tecnico on 09/11/2017.
 */
import {Route, withRouter, Link} from 'react-router-dom'
import React from 'react';
import './dashboard.css';
import $ from 'jquery';
import Config from '../config/config';

const url = Config.url;

const PieceItem = ({piece}) =>
    <div>
        <Link to={"/dashboard/pieces/" + piece.id}>
            <div>Nome: {piece.name} Data: {piece.date}</div>
            <div>Técnicas: {piece.techniques}</div>
            <div>Descrição: {piece.description}</div>
            <div>Keywords: {piece.keywords.join(',')}</div>
            <div>Multimedia : <img src={piece.multimedia}/></div>
        </Link>
    </div>;


class MinhaGaleria extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pieces: []

        };
        this.getMyPieces(this.state);
    }

    getMyPieces(state) {

        let t = this;
        $.get(url + "artwork/search/artist/" + this.props.user.id, function (data) {
            state.pieces = data;
            console.log(data);
            t.setState(state);
        });
    }

    render() {
        return (
            <div>
                <ul className="list-group">

                    {
                        this.state.pieces.map(
                            (piece, index) =>
                                (
                                    <li className="list-group-item" key={index}>
                                        <PieceItem piece={piece}/>
                                    </li>
                                )
                        )
                    }
                </ul>
            </div>
        )
    }
}


class CriarPeca extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dateOfCreation: "",
            techniques: [],
            description: "",
            keywords: [],
            multimedia: []

        };
        this.handleChange = this.handleChange.bind(this);
        this.createPiece = this.createPiece.bind(this);
    }

    handleChange({target}) {

        let s = this.state;
        if (target.name == 'keywords' || target.name == 'techniques') {
            if (target.value.indexOf(',') > -1) {

                let k = target.value.split(',');
                $.each(k, function (i, val) {
                    if (k.indexOf(val) < 0)
                        k.push(val);
                });
                s[target.name] = k;
            }
        }
        else if (target.name == 'multimedia') {
            s[target.name].push(target.value);
        }
        else
            s[target.name] = target.value;


        this.setState(s);
    }

    createPiece(e, inputData) {

        e.preventDefault();
        this.props.createPiece(this.state);
    }

    render() {
        return (
            <div>
                <section>

                    <form id="form_create_piece" onSubmit={this.createPiece}>
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
                            <input type="text" className="form-control" name="techniques"
                                   placeholder="Inserir Técnicnas" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Descrição textual</label>
                            <textarea name="description" className="form-control"
                                      onChange={this.handleChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Keywords</label>
                            <input type="text" name="keywords" className="form-control" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Multimedia</label>
                            <input type="url" name="multimedia" className="form-control" onChange={this.handleChange}/>
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
                            <a className="accordion-toggle collapsed toggle-switch" data-toggle="collapse"
                               href="#submenu-2">
                                <span className="sidebar-icon"><i className="fa fa-cubes"></i></span>
                                <span className="sidebar-title">Peça</span>
                                <b className="caret"></b>
                            </a>
                            <ul id="submenu-2" className="panel-collapse collapse panel-switch" role="menu">
                                <li><Link to={"/dashboard/piece/create"}><i className="fa fa-caret-right"></i>Nova
                                    Peça</Link></li>
                                <li><Link to={"/dashboard/piece/mygallery"}><i className="fa fa-caret-right"></i>Minha
                                    Galeria</Link>
                                </li>
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
            pieces: []
        };

        this.createPiece = this.createPiece.bind(this);


    }


    createPiece(p) {
        p['author'] = this.props.user.id;

        let t = this;

        $.ajax({
            type: 'POST',
            url: url + 'artwork',
            processData: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(p),
            success: function (result) {
                t.props.history.push("/dashboard/piece/mygallery");
            },
            error: function (status) {
                alert("Erro a criar peça!!");
                console.log("Failed	to	Post:	" + status);
            }
        });


    }


    render() {
        return (
            <div>

                <Route path="/dashboard/piece/create" exact={true} render={() => {
                    return (
                        <CriarPeca createPiece={this.createPiece}/>
                    );
                }}/>

                <Route path="/dashboard/piece/mygallery" exact={true} render={() => {
                    return (
                        <MinhaGaleria user={this.props.user}/>
                    );
                }}/>

                <MenuAsideArtista/>

            </div>
        );
    }


}


export default withRouter(DashboardArtista);
