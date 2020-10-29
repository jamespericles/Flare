// Container to display the main dashboard components including CTA bar, list of contacts by group, list of plans, and list of templates
import React from "react";
import ListTemplates from "./ListTemplates";
import ListPlans from "./ListPlans";
import ListContacts from "./ListContacts";
import ListGroups from "./ListGroups";
import FlareLogo9 from "../assets/flareLogo9.png";
// import { useStoreContext } from "../store/store";

const Dashboard = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <h5>Flare Dashboard</h5>
          <div className="row">
            <div className="col">
              <br />
              <p style={{ lineHeight: "1" }}>
                The dashboard is your launchpad to creating contacts, groups, templates, and plans. You'll get a
                birds-eye view of the latest activity and status of your plans, and you can quickly activate a plan
                right from this dashboard.
              </p>
            </div>
            <div className="col">
              <img src={FlareLogo9} width="150px" />
            </div>
          </div>
          <hr />
          <h6>Your Plans</h6>
          <ListPlans />
        </div>
        <div className="col-3 col-xs-12 col-sm-12 col-md-6 col-lg-3">
          <h6>Your Groups</h6>
          <ListGroups />
          <hr />
          <h6>Your Templates</h6>
          <ListTemplates />
        </div>

        <div className="col-3 col-xs-12 col-sm-12 col-md-6 col-lg-3">
          <h6>Your Contacts</h6>
          <ListContacts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
