// Component that maps through the contacts in the db associated with the user and renders them
import React, { useEffect, useState } from "react";
import { useStoreContext } from "../../store/store";
import {
  SET_PLANS,
  SET_GROUPS,
  SET_TEMPLATES,
  SET_CONTACTS,
  SAVE_PLAN,
  SAVE_CONTACT,
  SAVE_GROUP,
  SAVE_TEMPLATE
} from "../../store/actions";
import { Link } from "react-router-dom";
import axios from "axios";
import GroupItem from "../GroupItem";

const SendUpFlare = () => {
  const [state, dispatch] = useStoreContext();
  const [currGroups, setCurrGroups] = useState(state.groups);
  const [currContacts, setCurrContacts] = useState(state.contacts);
  const [currPlans, setCurrPlans] = useState(state.plans);
  const [currTemplates, setCurrTemplates] = useState(state.templates);
  const [selectedContact, setSelectedContact] = useState(state.contact);
  const [selectedPlan, setSelectedPlan] = useState(state.plan);
  const [selectedTemplate, setSelectedTemplate] = useState(state.template);
  const [selectedGroup, setSelectedGroup] = useState(state.group);

  useEffect(() => {
    loadPlans();
    loadGroups();
    loadContacts();
    loadTemplates();
    if (currGroups !== state.groups) {
      dispatch({ type: SET_GROUPS, groups: currGroups });
      setCurrGroups(currGroups);
    }
    if (currPlans !== state.plans) {
      dispatch({ type: SET_PLANS, groups: currPlans });
      setCurrGroups(currPlans);
    }
    if (currContacts !== state.contacts) {
      dispatch({ type: SET_CONTACTS, groups: currContacts });
      setCurrGroups(currContacts);
    }
    if (currTemplates !== state.templates) {
      dispatch({ type: SET_TEMPLATES, groups: currTemplates });
      setCurrGroups(currTemplates);
    }
  }, [state.user.id, dispatch, currGroups, currContacts, currPlans, currTemplates]);

  function loadGroups() {
    axios
      .get(`/api/groups/getallbyuser/${state.user.id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("loadgroups() from ListGroups component has run:", response.data.groups);
          dispatch({ type: SET_GROUPS, groups: response.data.groups });
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  }

  function loadContacts() {
    axios
      .get(`/api/contacts/getall/${state.user.id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("loadContacts() from SetUpFlare component has run:", response.data.contacts);
          dispatch({ type: SET_CONTACTS, contacts: response.data.contacts });
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  }
  function loadPlans() {
    axios
      .get(`/api/plans/getallbyuser/${state.user.id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("loadPlans() from SetUpFlare component has run:", response.data.plans);
          dispatch({ type: SET_PLANS, plans: response.data.plans });
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  }
  function loadTemplates() {
    axios
      .get(`/api/templates/getallbyuser/${state.user.id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("loadtemplates() from SetUpFlare component has run:", response.data.templates);
          dispatch({ type: SET_TEMPLATES, templates: response.data.templates });
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  }

  return (
    <div>
      <div className="groupitem">
        <ul>
          {state.groups !== null && state.groups.length > 0 ? (
            state.groups.map(group => {
              return <GroupItem key={`group-${group.id}`} group={group} />;
            })
          ) : (
            <p className="small">
              You don't have any groups yet. <Link to="/groups">Get Started!</Link>
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SendUpFlare;
