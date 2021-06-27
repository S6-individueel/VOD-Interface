import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// styling

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.generated.css";

// layouts

import Auth from "../src/layouts/Auth";
import Movie from "../src/layouts/Movie";
import Config from "../src/layouts/Config";

// views without layouts

import Index from "./views/Index.js";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {/* add routes with layouts */}
            <Route path="/movies" component={Movie} />
            <Route path="/config" component={Config} />
            <Route path="/auth" component={Auth} />
            {/* add routes without layouts */}
            {/* add redirect for first page */}
            <Route path="/" exact component={Index} />
            <Redirect from="*" to="/" />
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
