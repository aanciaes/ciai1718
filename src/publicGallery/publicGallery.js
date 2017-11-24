/**
 * Created by Tecnico on 09/11/2017.
 */
import React, {Component} from 'react';
import './publicGallery.css';
import $ from 'jquery';
import Config from '../config/config';
import Piece from '../piece/piece';

const url = Config.url;


class PieceItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="piece_content">
                    <div className="img_piece">
                        <img src={this.props.piece.multimedia}/>
                    </div>
                    <div className="desc_piece">
                        <span className="price_prod">10€</span>
                        <div>
                            <small>Keywords: {this.props.piece.keywords.join(",")}</small>
                        </div>
                        <div><label>{this.props.piece.name}</label></div>
                        <div>
                            <small>{this.props.piece.description}</small>
                        </div>
                        <div className="info_button">
                            <div>Info <i className="fa fa-arrow-circle-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class PiecesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pieces: []
        };

        this.getPieces(this.state);

    }

    getPieces(state) {


        let t = this;
        $.get(url + "artwork", function (data) {

            state.pieces = data;
            t.setState(state);
        });
    }

    render() {
        return (
            <div className="row">

                {
                    this.state.pieces.map((piece, index)=>
                        (<div key={index} className="col-md-3 col-xs-12">
                            <PieceItem piece={piece}/>
                        </div>)
                    )

                }

            </div>);
    }
}


class PublicGallery extends React.Component {
    render() {
        return (
            <div>
                <section>
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
                    <PiecesList/>
                </section>


            </div>
        );
    }
}

export default PublicGallery;