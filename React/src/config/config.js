/**
 * Created by Tecnico on 09/11/2017.
 */
import React, {Component} from 'react';


class Config {
    constructor() {
        this.url = "https://localhost:8443/";
        alert(this.url);
    }
}

export default (new Config);