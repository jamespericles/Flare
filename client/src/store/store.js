import React, { createContext, useContext, useReducer } from "react";
import {
  LOGIN,
  LOGOUT,
  LOADING,
  SET_USER,
  UNSET_USER,
  SAVE_CONTACT,
  SAVE_GROUP,
  SAVE_PLAN,
  SAVE_TEMPLATE,
  UPDATE_USER,
  UPDATE_CONTACT,
  UPDATE_GROUP,
  UPDATE_PLAN,
  UPDATE_TEMPLATE,
  DELETE_CONTACT,
  DELETE_GROUP,
  DELETE_PLAN,
  DELETE_TEMPLATE,
  SET_GROUPS,
  SET_PLANS,
  SET_CONTACTS,
  SET_TEMPLATES
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return {
        ...state,
        loading: false
      };

    case LOADING:
      return {
        ...state,
        loading: true
      };

    case SET_USER:
      return {
        ...state,
        user: action.user,
        loading: false
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
        loading: false
      };

    case UNSET_USER:
      return {
        ...state,
        user: null,
        contact: null,
        group: null,
        plan: null,
        template: null,
        contacts: null,
        groups: null,
        plans: null,
        templates: null,
        loading: false
      };

    case SAVE_CONTACT:
      return {
        ...state,
        contact: action.contact,
        loading: false
      };

    case UPDATE_CONTACT:
      return {
        ...state,
        contact: action.contact,
        loading: false
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contact: null,
        loading: false
      };

    case SAVE_GROUP:
      return {
        ...state,
        group: action.group,
        loading: false
      };

    case UPDATE_GROUP:
      return {
        ...state,
        group: action.group,
        loading: false
      };

    case DELETE_GROUP:
      return {
        ...state,
        group: null,
        loading: false
      };

    case SAVE_PLAN:
      return {
        ...state,
        plan: action.plan,
        loading: false
      };

    case UPDATE_PLAN:
      return {
        ...state,
        plan: action.plan,
        loading: false
      };

    case DELETE_PLAN:
      return {
        ...state,
        plan: null,
        loading: false
      };

    case SAVE_TEMPLATE:
      return {
        ...state,
        template: action.template,
        loading: false
      };

    case UPDATE_TEMPLATE:
      return {
        ...state,
        template: action.template,
        loading: false
      };

    case DELETE_TEMPLATE:
      return {
        ...state,
        template: null,
        loading: false
      };

    case SET_GROUPS:
      return {
        ...state,
        groups: action.groups,
        loading: false
      };

    case SET_PLANS:
      return {
        ...state,
        plans: action.plans,
        loading: false
      };

    case SET_TEMPLATES:
      return {
        ...state,
        templates: action.templates,
        loading: false
      };

    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.contacts,
        loading: false
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    contact: null,
    contacts: null,
    group: null,
    groups: null,
    plan: null,
    plans: null,
    template: null,
    templates: null,
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

// Allows StoreProvider const to be used which contains
export { StoreProvider, useStoreContext };
