//? NOTE:
//? The value assign to the action types below is arbitrary and doesn't
//? matter except that they be unique.  The simplest approach and standard
//? is to assign each action type a string value of its name. 

// ACTIONS FOR AUTHENTICATION //
//-------------------------------------//
export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOADING = 'LOADING';

// ACTIONS ON USER //
//-------------------------------------//
export const UPDATE_USER = 'UPDATE_USER';

// ACTIONS ON THE DATA STORE //
//-------------------------------------//
//? STORE will add objects to the data store.
//? export const STORE = "STORE";
//? UPDATE will modify existing objects in the data store.
//? export const UPDATE = "UPDATE";
//? DELETE will remove objects from the data store.
//? export const DELETE = "DELETE";

// ACTIONS FOR CONTACTS //
// -----------------------------------//
//? SAVE_CONTACT will add contact to the data store.
export const SAVE_CONTACT = 'SAVE_CONTACT';
//? UPDATE CONTACT will modify existing contact in the data state.
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
//? DELETE_CONTACT will remove contact from the data store.
export const DELETE_CONTACT = 'DELETE_CONTACT';
//? SET_CONTACTS Will find all contacts associated with the current user, 
//? and save them to the contacts variable in the data store.
export const SET_CONTACTS = 'SET_CONTACTS';

// ACTIONS FOR GROUPS //
// -----------------------------------//
//? SAVE_GROUP will add GROUP to the data store
export const SAVE_GROUP = 'SAVE_GROUP';
//? UPDATE GROUP will modify existing GROUP in the data state
export const UPDATE_GROUP = 'UPDATE_GROUP';
//? DELETE_GROUP will remove GROUP from the data store
export const DELETE_GROUP = 'DELETE_GROUP';
//? SET_GROUPS Will find all groups associated with the current user, 
//? and save them to the groups variable in the data store.
export const SET_GROUPS = 'SET_GROUPS';

// ACTIONS FOR TEMPLATES //
// -----------------------------------//
//? SAVE_TEMPLATE will add TEMPLATE to the data store
export const SAVE_TEMPLATE = 'SAVE_TEMPLATE';
//? UPDATE TEMPLATE will modify existing TEMPLATE in the data state
export const UPDATE_TEMPLATE = 'UPDATE_TEMPLATE';
//? DELETE_TEMPLATE will remove TEMPLATE from the data store
export const DELETE_TEMPLATE = 'DELETE_TEMPLATE';
//? SET_TEMPLATES Will find all templates associated with the current user, 
//? and save them to the templates variable in the data store.
export const SET_TEMPLATES = 'SET_TEMPLATES';

// ACTIONS FOR PLANS //
// -----------------------------------//
//? SAVE_PLAN will add PLAN to the data store
export const SAVE_PLAN = 'SAVE_PLAN';
//? UPDATE PLAN will modify existing PLAN in the data state
export const UPDATE_PLAN = 'UPDATE_PLAN';
//? DELETE_PLAN will remove PLAN from the data store
export const DELETE_PLAN = 'DELETE_PLAN';
//? SET_PLANS Will find all plans associated with the current user, 
//? and save them to the plans variable in the data store.
export const SET_PLANS = 'SET_PLANS';