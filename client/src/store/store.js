import React, { createContext, useContext, useReducer } from 'react';
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
} from './actions';


const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return {
        ...state,
        loading: true,
      };
    
      // Added New/ Not in original modal
    case LOADING:
      return {
        ...state,
        loading: true,
      };
      // ----- Added New/... END //*

    
    case SET_USER:
      return {
        ...state,
        user: action.user,
        loading: false,
      };

    case UNSET_USER:
      return {
        ...state,
        user: null,
        loading: false,
      };

    case SAVE_CONTACT:
      return {
        ...state,
        contact: action.contact
      };
    
    case UPDATE_CONTACT:
    return {
      ...state,
      contact: action.contact
    };

    case DELETE_CONTACT:
      return {
        ...state,
        contact: action.contact,
      };

    case SAVE_GROUP:
    return {
      ...state,
      group: action.group
    };
    
    case UPDATE_GROUP:
    return {
      ...state,
      group: action.group
    };

    case DELETE_GROUP:
      return {
        ...state,
        group: action.group,
      };

    case SAVE_PLAN:
      return {
        ...state,
        plan: action.plan
      };
    
    case UPDATE_PLAN:
    return {
      ...state,
      plan: action.plan
    };

    case DELETE_PLAN:
      return {
        ...state,
        plan: action.plan,
      };
    
    case SAVE_TEMPLATE:
      return {
        ...state,
        template: action.template
      };
    
    case UPDATE_TEMPLATE:
    return {
      ...state,
      template: action.template
    };

    case DELETE_TEMPLATE:
      return {
        ...state,
        template: action.template,
      };
    
    case SET_GROUPS:
      return {
        ...state,
        groups: action.groups,
      }

    case SET_PLANS:
      return {
        ...state,
        plans: action.plans,
    }

    case SET_TEMPLATES:
    return {
      ...state,
      templates: action.templates,
    }

    case SET_CONTACTS:
    return {
      ...state,
      contacts: action.contacts,
    }

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
    loading: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

// Allows StoreProvider const to be used which contains 
export { StoreProvider, useStoreContext };
