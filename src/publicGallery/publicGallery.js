/**
 * Created by Tecnico on 09/11/2017.
 */
import React, {Component} from 'react';
import './publicGallery.css';


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
                                    <input id="search" type="search" className="form-control" name="search" placeholder="Procurar"/>
                                </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-xs-12">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-xs-12">
                            <div className="piece_content">
                                <div className="img_piece">
                                    <img src="/imgs/perfil.png"/>

                                </div>
                                <div className="desc_piece">
                                    <span className="price_prod">10€</span>
                                    <div>
                                        <small>Keywords: aaaa</small>
                                    </div>
                                    <div><label>Mona Tiago</label></div>
                                    <div>
                                        <small>Mona tiago um quadro fixe</small>
                                    </div>
                                    <div className="info_button">
                                        <div>Info <i className="fa fa-arrow-circle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-12">
                            <div className="piece_content">
                                <div className="img_piece">
                                    <img src="/imgs/perfil.png"/>

                                </div>
                                <div className="desc_piece">
                                    <span className="price_prod">10€</span>
                                    <div>
                                        <small>Keywords: aaaa</small>
                                    </div>
                                    <div><label>Mona Tiago</label></div>
                                    <div>
                                        <small>Mona tiago um quadro fixe</small>
                                    </div>
                                    <div className="info_button">
                                        <div>Info <i className="fa fa-arrow-circle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-12">
                            <div className="piece_content">
                                <div className="img_piece">
                                    <img src="/imgs/perfil.png"/>

                                </div>
                                <div className="desc_piece">
                                    <span className="price_prod">10€</span>
                                    <div>
                                        <small>Keywords: aaaa</small>
                                    </div>
                                    <div><label>Mona Tiago</label></div>
                                    <div>
                                        <small>Mona tiago um quadro fixe</small>
                                    </div>
                                    <div className="info_button">
                                        <div>Info <i className="fa fa-arrow-circle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-12">
                            <div className="piece_content">
                                <div className="img_piece">
                                    <img src="/imgs/perfil.png"/>

                                </div>
                                <div className="desc_piece">
                                    <span className="price_prod">10€</span>
                                    <div>
                                        <small>Keywords: aaaa</small>
                                    </div>
                                    <div><label>Mona Tiago</label></div>
                                    <div>
                                        <small>Mona tiago um quadro fixe</small>
                                    </div>
                                    <div className="info_button">
                                        <div>Info <i className="fa fa-arrow-circle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        );
    }
}

export default PublicGallery;