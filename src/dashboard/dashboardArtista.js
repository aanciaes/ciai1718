/**
 * Created by Tecnico on 09/11/2017.
 */
import {Route, withRouter, Link} from 'react-router-dom'
import React from 'react';
import './dashboard.css';
import $ from 'jquery';
import Utils from '../utils/utils';
import Config from '../config/config';

const url = Config.url;


class PieceItem extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        let p = this.props.piece;
        return (
            <div>
                <div className="piece_content">
                    <div className="img_piece">
                        <div>
                            <img src={p.multimedia[0]}/>
                        </div>
                    </div>
                    <div className="desc_piece">

                        <span className={p.onSale ? "price_prod" : ""}> {p.onSale ? p.price + " €" : "" }</span>
                        <div>
                            <small>Keywords: {p.keywords.join(",")}</small>
                        </div>
                        <div><label>{p.name}</label></div>
                        <div className="info_button">
                            <Link to={ "/dashboard/pieces/" + p.id}>
                                <div>Info <i className="fa fa-arrow-circle-right"></i></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


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
        $.get(url + "artwork/artist/" + this.props.user.id + "/list", function (data) {
            state.pieces = data;
            console.log(data);
            t.setState(state);
        });
    }

    render() {
        return (
            <div id="list_my_gallery">
                <div className="row">
                    <div className="col-md-2 col-xs-12">
                    </div>
                    <div className="col-md-7 col-xs-12">
                        <div id="search_field">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-search"></i></span>
                                <input id="search" type="search" className="form-control" name="search"
                                       placeholder="Procurar"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-xs-12">
                    </div>
                </div>
                <div className="row">

                    {
                        this.state.pieces.map((piece, index)=>
                            (<div key={index} className="col-md-3 col-xs-12">

                                <PieceItem piece={piece}/>

                            </div>)
                        )

                    }

                </div>
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
            techniques: "",
            description: "",
            keywords: "",
            multimedia: ""

        };
        this.handleChange = this.handleChange.bind(this);
        this.createPiece = this.createPiece.bind(this);
    }

    handleChange({target}) {

        let s = this.state;
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
                <section className="content_form_big">

                    <form id="form_create_piece" onSubmit={this.createPiece}>
                        <div className="form_title">
                            <h5 className="tangerine subtitle">Criar Peça</h5>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-xs-12">

                                <div className="form-group row">

                                    <label for="name" className="col-sm-2 col-form-label">Nome</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="name" className="form-control" name="name"
                                               placeholder="Inserir nome" onChange={this.handleChange}
                                               required="required"/>
                                    </div>

                                </div>

                                <div className="form-group row">
                                    <label for="dateOfCreation" className="col-sm-2 col-form-label">Data:</label>

                                    <div className="col-sm-4">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i
                                                className="fa fa-calendar"></i></span>
                                            <input type="date" id="dateOfCreation" className="form-control"
                                                   name="dateOfCreation"
                                                   placeholder="Inserir Data" onChange={this.handleChange}/>
                                        </div>
                                    </div>

                                </div>

                                <div className="form-group row">

                                    <label for="techniques" className="col-sm-2 col-form-label">Técnicas</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="techniques" name="techniques"
                                               placeholder="valor,valor,.."
                                               pattern="^(?:[a-zÀ-úA-Z0-9 ]+,)*[a-zÀ-úA-Z0-9 ]+$"
                                               onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="form-group row">

                                    <label for="keywords" className="col-sm-2 col-form-label">Keywords:</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="keywords" id="keywords" placeholder="valor,valor,.."
                                               className="form-control"
                                               pattern="^(?:[a-zÀ-úA-Z0-9 ]+,)*[a-zÀ-úA-Z0-9 ]+$"
                                               onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="form-group row">

                                    <label for="multimedia" className="col-sm-2 col-form-label">Multimedia</label>
                                    <div className="col-sm-10">

                                        <textarea name="multimedia" id="multimedia" className="form-control"
                                                  onChange={this.handleChange}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-xs-12">
                                <div className="form-group left_text">
                                    <label>Descrição textual</label>
                                    <textarea name="description" className="form-control"
                                              onChange={this.handleChange}></textarea>
                                </div>

                            </div>
                        </div>


                        <div className="button_submit">
                            <button type="submit" className="btn btn-primary">Criar</button>
                        </div>

                    </form>
                </section>

            </div>

        )
    }

}


class MenuAsideArtista extends React.Component {


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

                            <Link to={"/dashboard/mybids"}>
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


class DashboardArtista extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pieces: []
        };

        this.createPiece = this.createPiece.bind(this);
        this.constructArray = this.constructArray.bind(this);


    }

    constructArray(s) {
        let arr = [];
        if (s.indexOf(",") > -1) {
            let k = s.split(',');
            arr = k;

        } else if (s.indexOf("\n") > -1) {
            let k = s.split('\n');
            arr = k;
        }
        else
            arr.push(s);
        return arr;
    }


    createPiece(p) {
        let t = this;
        p['author'] = t.props.user.id;
        p['multimedia'] = t.constructArray(p['multimedia']);
        p['techniques'] = t.constructArray(p['techniques']);
        p['keywords'] = t.constructArray(p['keywords']);


        Utils.ajaxRequest('POST',
            url + 'artwork',
            function (result) {
                t.props.history.push("/dashboard/piece/mygallery");
            },
            true,
            {
                contentType: "application/json;",
                data: JSON.stringify(p)
            }
        );


        /*$.ajax({
         type: 'POST',
         url: url + 'artwork',
         xhrFields: {
         withCredentials: true
         },
         processData: false,
         dataType: "json",
         contentType: "application/json;",
         data: JSON.stringify(p),
         success: function (result) {

         t.props.history.push("/dashboard/piece/mygallery");
         },
         error: function (status) {
         alert("Erro a criar peça!!");
         console.log(status);
         console.log("Failed	to	Post:	" + status);
         }
         });*/


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
