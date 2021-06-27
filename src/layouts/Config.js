import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import IndexNavbar from "../components/Navbars/IndexNavbar";
import Footer from "../components/Footers/Footer.js";

// views

import Profile from "../views/config/Profile.js";

export default function Auth() {
    return (
        <>
            <IndexNavbar transparent />
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
                        <Route path="/config/profile" exact component={Profile} />
                        <Redirect from="/config" to="/config/profile" />
                    </Switch>
                    <Footer fixed />
                </section>
            </main>
        </>
    );
}
