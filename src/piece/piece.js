/**
 * Created by Tecnico on 09/11/2017.
 */
import React from 'react';

import './piece.css';
import Config from '../config/config';
import $ from 'jquery';

const url = Config.url;

class PieceArtista extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="col-md-2 col-xs-12">
                    <div>
                        <button className="btn btn-primary">Editar</button>
                    </div>
                </div>
                <div className="col-md-10 col-xs-12"></div>
            </div>
        )
    }

}

class PieceBasico extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="col-md-2 col-xs-12">
                    <div>
                        <button className="btn btn-primary">Bids</button>
                    </div>
                </div>
                <div className="col-md-10 col-xs-12"></div>
            </div>
        )
    }

}

class PieceDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let p = this.props.piece;
        return (
            <div>
                <section className="content_piece">

                    <div className="row">
                        <div className="col-md-3 col-xs-12">
                            <img src={p.multimedia}/>

                        </div>
                        <div className="col-md-9 col-xs-12">
                            <h2 className="font-bold m-b-xs">
                                {p.name}
                            </h2>
                            <small>Many desktop publishing packages and web page editors now.</small>
                            <div className="m-t-md">
                                <h2 className="product-main-price">$406,602
                                    <small>Exclude Tax</small>
                                </h2>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}

function PieceControl(props) {
    if (props.user !== undefined && props.user != null) {
        let u = props.user;
        if (u.type == 1)
            return (<PieceArtista/>);
        else
            return (<PieceBasico/>);
    }
    return null;

}


class Piece extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            piece: {}
        };

        this.getPiece(this.props.piece_id);
        //this.getPiece = this.getPiece.bind(this);
    }

    componentDidMount(){
        this.getPiece(this.props.piece_id);
    }


    getPiece(id) {
        let t = this;
        console.log(id);
        $.get(url + "artwork/" + id, function (data) {
            t.state.piece = data;
            t.setState(t.state);
        });
    }

    render() {
        return (
            <div>
                <PieceDetail piece={this.state.piece}/>
                <PieceControl user={this.props.user}/>
            </div>
        );
    }
}

export default Piece;