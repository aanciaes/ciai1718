/**
 * Created by Tecnico on 09/11/2017.
 */
import {Route, Link, withRouter} from 'react-router-dom'
import React, {Component} from 'react';
import User from './user';
import './dashboard.css';


const Test = ()=>
    <div>
        <h1>Teste</h1>
    </div>;


class MenuDash extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logoutUser();
    }

    render() {

        return (
            <div>

                <header className="App-header">
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
                                <a className="navbar-brand" href="#">ArtBiz</a>
                            </div>
                            <div id="navbar" className="navbar-collapse collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <Link to={`/dashboard/user/${this.props.user.id}`}> {this.props.user.name}<span
                                            className="glyphicon glyphicon-user"></span></Link>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                <span className="glyphicon glyphicon-chevron-down"></span>
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#" onClick={this.logout}>Logout</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        );

    }

}


class Dashboard extends React.Component {

    constructor(props) {
        super(props);


    }


    render() {
        return (
            <div>
                <MenuDash user={this.props.users[this.props.user_id]} logoutUser={this.props.logoutUser}/>

                <Route path="/dashboard/user/:id" exact={true} render={({match}) => {
                    return (<User user={this.props.users[match.params.id]} updateUser={this.props.updateUser}/>);
                }
                }/>

            </div>
        );
    }


}


export default withRouter(Dashboard);
