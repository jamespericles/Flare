import React, { useEffect } from 'react';
import axios from 'axios';
import { Route } from "react-router-dom";
import { useStoreContext } from '../../store/store';
import Dashboard from "../../components/DashboardContainer";
import Groups from "../../components/GroupContainer";
import Plans from "../../components/PlanContainer";
import Templates from "../../components/TemplateContainer";
import Profile from "../../components/ProfileContainer";
import Footer from "../../components/Footer";
import Navbar from 'react-bootstrap/Navbar'
import { SET_GROUPS, SET_PLANS, SET_CONTACTS, SET_TEMPLATES } from '../../store/actions';
import Sidebar from "../../components/Sidebar";

import './style.css';

import { enableRipple } from '@syncfusion/ej2-base';
// import { SidebarComponent } from '@syncfusion/ej2-react-navigations';

enableRipple(true);


const Main = () => {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        // Load Groups/set to StoreContext
        axios
        .get(`/api/groups/getallbyuser/${state.user.id}`)
        .then((response) => {
        if (response.status === 200) {
            console.log(response.data.groups);
            dispatch({type: SET_GROUPS, groups: response.data.groups});
        }
        })
        .catch((error) => {
        console.log({message: error.message});
        console.log(error);
        });

        // Load Templates / set to StoreContext
        axios
        .get(`/api/templates/getallbyuser/${state.user.id}`)
        .then((response) => {
        if (response.status === 200) {
            console.log(response.data.templates);
            dispatch({type: SET_TEMPLATES, templates: response.data.templates});
        }
        })
        .catch((error) => {
        console.log({message: error.message});
        console.log(error);
        });

        // Load Plans / set to StoreContext
        axios
        .get(`/api/plans/getallbyuser/${state.user.id}`)
        .then((response) => {
        if (response.status === 200) {
            console.log(response.data.plans);
            dispatch({type: SET_PLANS, plans: response.data.plans});
        }
        })
        .catch((error) => {
        console.log({message: error.message});
        console.log(error);
        });

        // Load Contacts / set to StoreContext
        axios
        .get(`/api/contacts/getall/${state.user.id}`)
        .then((response) => {
        if (response.status === 200) {
            console.log(response.data.contacts);
            dispatch({type: SET_CONTACTS, contacts: response.data.contacts});
        }
        })
        .catch((error) => {
        console.log({message: error.message});
        console.log(error);
        });  
    },[dispatch, state.user.id])

        return (
            <div className="control-section sidebar-list">
                <div id="wrapper">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        
                        <Sidebar style={{ zIndex: "100" }}/>
                        
                        <div>
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/plans" component={Plans} />
                            <Route exact path="/groups" component={Groups} />
                            <Route exact path="/templates" component={Templates} />
                            <Route exact path="/profile" component={Profile} />
                            
                        </div>
                        <Navbar className="mb-0 text-center" fixed="bottom pb-0 pl-0"><Footer/></Navbar>
                    </div>
                </div>
                
            </div>);
    }
    

export default Main;