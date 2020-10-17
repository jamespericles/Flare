import React, { Component } from 'react';
// import { Provider } from "react-redux";
// import Store from "../../store";
// import axios from 'axios';
// import { Link, Route, useHistory } from "react-router-dom";
import { Route } from "react-router-dom";

//? Key body routed components
import Dashboard from "../../components/DashboardContainer";
import Groups from "../../components/GroupContainer";
import Plans from "../../components/PlanContainer";
import Templates from "../../components/TemplateContainer";
import Profile from "../../components/ProfileContainer";
import Footer from "../../components/Footer/index.js";

import Sidebar from "../../components/Sidebar";

import './style.css';

import { enableRipple } from '@syncfusion/ej2-base';
// import { SidebarComponent } from '@syncfusion/ej2-react-navigations';

enableRipple(true);

export default class Main extends Component {
    
    render() {
        return (
            <div className="control-section sidebar-list">
                <div id="wrapper">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        
                        <Sidebar />
                        
                        <div>
                                        <Route exact path={`/main`} component={Dashboard} />
                                        <Route exact path={`/main/plans`} component={Plans} />
                                        <Route exact path={`/main/groups`} component={Groups} />
                                        <Route exact path={`/main/templates`} component={Templates} />
                                        <Route exact path={`/main/profile`} component={Profile} />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>);
    }
    
}

// export default Main;