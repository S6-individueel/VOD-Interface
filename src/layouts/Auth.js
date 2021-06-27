import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import IndexNavbar from "../components/Navbars/IndexNavbar";
import Footer from "../components/Footers/Footer.js";

// views

import Login from "../views/auth/Login.js";
import Register from "../views/auth/Register.js";
import Patch from "../views/auth/Patch";

export default function Auth() {
    return (
        <>
            <IndexNavbar transparent/>
            <main>
                <section className="relative w-full h-full pt-16 min-h-screen">
                    {/*<div*/}
                    {/*    className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"*/}
                    {/*    style={{*/}
                    {/*        backgroundImage:*/}
                    {/*            "url(" + require("assets/img/register_bg_2.png").default + ")",*/}
                    {/*    }}*/}
                    {/*></div>*/}
                    <Switch>
                        <Route path="/auth/patch" exact component={Patch} />
                        <Route path="/auth/login" exact component={Login} />
                        <Route path="/auth/register" exact component={Register} />
                        <Redirect from="/auth" to="/auth/login" />
                    </Switch>
                    <Footer />
                </section>
            </main>
        </>
    );
}
