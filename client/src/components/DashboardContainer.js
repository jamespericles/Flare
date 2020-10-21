// Container to display the main dashboard components including CTA bar, list of contacts by group, list of plans, and list of templates
import React, { Component } from 'react'
import ListTemplates from "./ListTemplates";
import ListPlans from "./ListPlans";
import ListContacts from "./ListContacts";
import ListGroups from "./ListGroups";

export default class Dashboard extends Component {
    

    render() {
        return (
            <div>
                <h5 className="container">Dashboard here</h5>
                <div className="row">
                    <div className="col-4 col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <h5>Your Plans</h5><br />
                        <ListPlans />
                        {/* <ListTemplates /> */}
                    </div>
                    <div className="col-4 col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <h5>Your Groups</h5><br />
                        <ListGroups />
                        {/* <ListContacts /> */}
                    </div>
                    <div className="col-4 col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <h5>Your Templates</h5><br />
                        <ListTemplates />
                    </div>
                    <div className="col-4 col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <h5>Your Contacts</h5><br />
                        <ListContacts />
                    </div>
                </div>
            </div>
        )
    }
}