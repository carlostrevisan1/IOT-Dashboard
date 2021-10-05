import React, { Component } from "react";
import { Router, Switch, Route, useHistory } from "react-router-dom";
import App from "../views/App/App";
import Dashboard from "../views/Dashboard/Dashboard";
import Menu from '../components/Menu/Menu'



export default function Routes() {

    let history = useHistory();

    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/Dashboard" exact component={Dashboard} />
            </Switch>
        </Router>
    );
    
}