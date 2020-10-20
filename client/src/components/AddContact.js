// Component to hold a contact addition/creation form; functionality for adding a contact
// may weave in search and update functionality here if possible

import axios from 'axios';
import React, { useState } from 'react';
// import { select } from '@syncfusion/ej2-base';
// import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
// import { DialogComponent } from '@syncfusion/ej2-react-popups';
// import * as ReactDOM from 'react-dom';
import { LOADING } from '../store/actions';
import { saveContact } from '../store/actionCreators';
import { useStoreContext } from '../store/store';

const AddContact = () => {
    const [state, dispatch] = useStoreContext();

    const [newContact, setNewContact] = useState({
        firstname: '',
        lastname: '',
        nickname: '',
        relationship: '',
        email: '',
        mobile: '',
    });

    console.log(state.user.id);

    // Handles updating the new contact whenever a change event or keytroke occurs.
    const handleChange = (event) => {
        // Sets a generic name and value so that newContact updates whenever any field is updated, and updates the field being with the current value of that field.
        const { name, value } = event.target;
        // Spreads newContact so we don't overwrite the existing info of the field(s) and then sets the value of the field regardless of the value and name of the field (since set generically).
        console.log (`firstname in form: ${newContact.firstname}`);
        console.log (`lastname in form: ${newContact.lastname}`);
        console.log (`nickname in form: ${newContact.nickname}`);
        console.log (`relationship in form: ${newContact.relationship}`);
        console.log (`email in form: ${newContact.email}`);
        console.log (`mobile in form: ${newContact.mobile}`);
        setNewContact({ ...newContact, [name]: value });

    }
    
    
    const handleSubmit = (event) => {
        // Prevents page refresh thereby losing info
        event.preventDefault();
        console.log (`submitted firstname: ${newContact.firstname}`);
        console.log (`submitted lastname: ${newContact.lastname}`);
        console.log (`submitted nickname: ${newContact.nickname}`);
        console.log (`submitted relationship: ${newContact.relationship}`);
        console.log (`submitted email: ${newContact.email}`);
        console.log (`submitted mobile: ${newContact.mobile}`);
        dispatch({ type: LOADING });

        axios
            .post(`/api/contacts/add/${state.user.id}`, {
                firstname: newContact.firstname,
                lastname: newContact.lastname,
                nickname: newContact.nickname,
                relationship: newContact.relationship,
                email: newContact.email,
                mobile: newContact.mobile,
                users: state.user.id
            })
            .then((response) => {
                console.log (`posted firstname: ${newContact.firstname}`);
                console.log (`posted lastname: ${newContact.lastname}`);
                console.log (`posted nickname: ${newContact.nickname}`);
                console.log (`posted relationship: ${newContact.relationship}`);
                console.log (`posted email: ${newContact.email}`);
                console.log (`posted mobile: ${newContact.mobile}`);
                console.log (`posted users(the user id): ${state.user.id}`)
                if (response.status === 200) {
                    dispatch(saveContact(newContact))
                };
            })
            .catch((error) => {
                console.log({message: error.message});
                console.log(error);
            });

        setNewContact({
            firstname: '',
            lastname: '',
            nickname: '',
            relationship: '',
            email: '',
            mobile: '',
        });
    }
    
    return (    
        <div className = 'control-pane'>
            <div className='control-section col-xs-12 col-sm-12 col-md-4'>
                <h4 className="form-title">Add New Contact</h4>
                <div className='validation_wrapper'>
                    <div className="control_wrapper" id="control_wrapper">
                        <form id="addContact"  method="post">
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="fistname">First Name</label>
                                    <input 
                                        type="text" 
                                        id="firstname" 
                                        name="firstname"
                                        value={newContact.firstname} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>  
                                </div>
                                <div id="firstnameError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="lastname">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="lastname" 
                                        name="lastname"
                                        value={newContact.lastname} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>
                                </div>
                                <div id="lastnameError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="nickname">Nickname</label>
                                    <input 
                                        type="text" 
                                        id="nickname" 
                                        name="nickname"
                                        value={newContact.nickname} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>
                                </div>
                                <div id="nicknameError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="relationship">Relationship</label>
                                    <input 
                                        type="text" 
                                        id="relationship" 
                                        name="relationship"
                                        value={newContact.relationship} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>
                                </div>
                                <div id="relationshipError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="email">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email"
                                        value={newContact.email} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>
                                </div>
                                <div id="emailError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="mobile">Mobile</label>
                                    <input 
                                        type="text" 
                                        id="mobile" 
                                        name="mobile"
                                        value={newContact.mobile} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>
                                </div>
                                <div id="mobileError"/>
                            </div>
                        <br/>
                        <br/>
                        <div className="submitBtn">
                            <button 
                                className="submit-btn e-btn btn btn-lg btn-block" 
                                id="submit-btn" 
                                type="submit" 
                                style={{ backgroundColor: "#E8C547" }}
                                onClick={handleSubmit}
                            >
                                Add Contact
                            </button>
                        </div>
                        </form>
                        <div id="confirmationDialog"/> </div>
                    </div>
                </div>
        </div>
    ) 
}

export default AddContact;