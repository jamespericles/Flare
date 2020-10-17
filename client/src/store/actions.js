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

// ACTIONS ON THE DATA STORE //
//-------------------------------------//
//? STORE will add objects to the data store.
export const STORE = "STORE";
//? UPDATE will modify existing objects in the data store.
export const UPDATE = "UPDATE";
//? DELETE will remove objects from the data store.
export const DELETE = "DELETE";