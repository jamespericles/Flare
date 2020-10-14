import React from "react";
//! Core page layout components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
//! Key body routed components
import Dashboard from "../components/Dashboard";
import Groups from "../components/Groups";
import Plans from "../components/Plans";
import Templates from "../components/Templates";
import Profile from "../components/Profile";
//! Routing dependencies
import { Route } from "react-router-dom";
//! Animations Dependencies
// import { handleHoverSub, handleHoverSubExit } from "../components/Animations";

const Main = (props) => {

    return (
        <div className="content-container" style={{ overflowY: "scroll" }}>
            <Header />
            <div className="container-fluid">
                <h3>Logged In Successfully!  Now showing the main page.</h3>
                <Menu />
                <div className="container">
                    <Route exact path={`${props.match.url}`} component={Dashboard} />
                    <Route exact path={`${props.match.url}/dashboard`} component={Dashboard} />
                    <Route exact path={`${props.match.url}/plans`} component={Plans} />
                    <Route exact path={`${props.match.url}/groups`} component={Groups} />
                    <Route exact path={`${props.match.url}/templates`} component={Templates} />
                    <Route exact path={`${props.match.url}/profile`} component={Profile} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

Main.propTypes = {};

export default Main;