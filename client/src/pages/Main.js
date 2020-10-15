import React from "react";
//! Core page layout components
import NavHead from "../components/NavHead";
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
            <NavHead />
            <div className="container-fluid">
                <h3>Logged In Successfully!  Now showing the main page.</h3>
                <Menu />
                <div className="container">
                    <Route exact path={`/main`} component={Dashboard} />
                    <Route exact path={`/main/plans`} component={Plans} />
                    <Route exact path={`/main/groups`} component={Groups} />
                    <Route exact path={`/main/templates`} component={Templates} />
                    <Route exact path={`/main/profile`} component={Profile} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

Main.propTypes = {};

export default Main;