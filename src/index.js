import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import ClassList from "./components/classlist/classlist";
import Student from "./components/lecture/lecture";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";

import { Provider } from 'react-redux';
import { store } from './redux/store';

import "dotenv/config";
import "./global.css";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path="/" component={App} />
            <Route path="/home" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/classlist" component={ClassList} />
            <Route path="/lecture" component={Student} />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
