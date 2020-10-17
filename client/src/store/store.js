import React, { createContext, useContext, useReducer } from 'react';
import { LOGIN, LOGOUT, SET_USER, UNSET_USER, STORE, UPDATE, DELETE } from './actions';
// import { GROUPS, TEMPLATES, PLANS, CONTACTS } from './dataTypes.js';


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

    case STORE:
      return {
        ...state,
        [action.dataType]:
          state[action.dataType].map(p => 
            p.id === action.payload.id ? action.payload : p)
      };

    case UPDATE:
      return {
        ...state,
        [action.dataType]: state[action.dataType].map(p =>
          p.id === action.payload.id ? action.payload : p)
      };

    case DELETE:
      return {
        ...state,
        [action.dataType]: state[action.dataType]
        .filter(p => p.id !== action.payload)
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    loading: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

// Allows StoreProvider const to be used which contains 
export { StoreProvider, useStoreContext };
