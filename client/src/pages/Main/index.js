// import React, { useEffect } from "react";
import React from "react";
// import axios from "axios";
import { Route } from "react-router-dom";
import Dashboard from "../../components/DashboardContainer";
import Groups from "../../components/GroupContainer";
import Plans from "../../components/PlanContainer";
import Templates from "../../components/TemplateContainer";
import Contacts from "../../components/ContactsContainer";
import Profile from "../../components/ProfileContainer";
import Twilio from "../../components/Twilio";
import Sidebar from "../../components/Sidebar";
// import { useStoreContext } from "../../store/store";
// import { SET_CONTACTS, SET_GROUPS, SET_TEMPLATES, SET_PLANS } from "../../store/actions";

import "./style.css";

const Main = () => {
  // const [state, dispatch] = useStoreContext();

  // useEffect(() => {
  //get all the plans for this user
  // axios
  //   .get(`/api/plans/getallbyuser/${state.user.id}`)
  //   .then(response => {
  //     if (response.status === 200) {
  //       console.log("MAIN: LoadPlans() has run:", response.data.plans);
  //       dispatch({ type: SET_PLANS, plans: response.data.plans });
  //     }
  //   })
  //   .catch(error => {
  //     console.log({ message: error.message });
  //     console.log(error);
  //   });
  // },[state.plans]);

  // useEffect(() => {
  //get all the contacts for this user
  // axios
  //   .get(`/api/contacts/getall/${state.user.id}`)
  //   .then(response => {
  //     if (response.status === 200) {
  //       console.log("MAIN: LoadContacts()  has run:", response.data.contacts);
  //       dispatch({ type: SET_CONTACTS, contacts: response.data.contacts });
  //     }
  //   })
  //   .catch(error => {
  //     console.log({ message: error.message });
  //     console.log(error);
  //   });
  // },[state.contacts]);

  // useEffect(() => {
  //get all the templates for this user
  // axios
  //   .get(`/api/templates/getallbyuser/${state.user.id}`)
  //   .then(response => {
  //     if (response.status === 200) {
  //       console.log("MAIN: LoadTemplates() has run:", response.data.templates);
  //       dispatch({ type: SET_TEMPLATES, templates: response.data.templates });
  //     }
  //   })
  //   .catch(error => {
  //     console.log({ message: error.message });
  //     console.log(error);
  //   });
  // });

  // useEffect(() => {
  //get all the groups for this user
  // axios
  //   .get(`/api/groups/getallbyuser/${state.user.id}`)
  //   .then(response => {
  //     if (response.status === 200) {
  //       console.log("MAIN: LoadGroups() has run:", response.data.groups);
  //       dispatch({ type: SET_GROUPS, groups: response.data.groups });
  //     }
  //   })
  //   .catch(error => {
  //     console.log({ message: error.message });
  //     console.log(error);
  //   });
  // });

  return (
    <div className="control-section sidebar-list">
      <div id="wrapper">
        <div className="col-lg-12 col-sm-12 col-md-12">
          <Sidebar style={{ zIndex: "100" }} />
          <div>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/plans" component={Plans} />
            <Route exact path="/groups" component={Groups} />
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/templates" component={Templates} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/twilio" component={Twilio} />
          </div>
          {/* <Navbar className="mb-0 text-center" fixed="bottom pb-0 pl-0"><Footer/></Navbar> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
