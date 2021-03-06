/**
 * Created by Tecnico on 09/11/2017.
 */
import React, {Component} from 'react';
import $ from 'jquery';


class Utils {
    constructor() {

        this.ajaxRequest = this.ajaxRequest.bind(this);
        this.diff_minutes = this.diff_minutes.bind(this);
    }


    ajaxRequest(type, url, success, credentials, optional) {
        let params = {
            type: type,
            url: url,
            beforeSend: function () {
                // setting a timeout
                $("#loading").show();

            },
            success: success,

            error: function (status) {

                alert("ERRO: " + status.responseJSON.exception);
                console.log(status);
            },
            complete: function () {
                $("#loading").hide();
            }
        };

        if (optional.error !== undefined)
            params.error = optional.error;
        if (optional.contentType !== undefined)
            params.contentType = optional.contentType;
        if (credentials)
            params.xhrFields = {withCredentials: true};
        if (optional.data !== undefined)
            params.data = optional.data;

        $.ajax(params);
    }

    diff_minutes(dt2, dt1) {

        let diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));

    }
}

export default (new Utils);