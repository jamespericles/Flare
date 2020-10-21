// Component to hold a contact addition/creation form; functionality for adding a template

import axios from 'axios';
import React, { useState } from 'react';
import { SAVE_TEMPLATE } from '../store/actions';
import { saveTemplate } from '../store/actionCreators';
import { useStoreContext } from '../store/store';

const AddTemplate = () => {
    const [state, dispatch] = useStoreContext();

    const [newTemplate, setNewTemplate] = useState({
        templateName: '',
        message: ''
    });

    console.log(state.user.id);

    // Handles updating the new contact whenever a change event or keytroke occurs.
    const handleChange = (event) => {
        // Sets a generic name and value so that newContact updates whenever any field is updated, and updates the field being with the current value of that field.
        const { name, value } = event.target;
        // Spreads newContact so we don't overwrite the existing info of the field(s) and then sets the value of the field regardless of the value and name of the field (since set generically).
        // console.log (`firstname in form: ${newContact.firstname}`);
        // console.log (`lastname in form: ${newContact.lastname}`);
        // console.log (`nickname in form: ${newContact.nickname}`);
        // console.log (`relationship in form: ${newContact.relationship}`);
        // console.log (`email in form: ${newContact.email}`);
        // console.log (`mobile in form: ${newContact.mobile}`);
        setNewTemplate({ ...newTemplate, [name]: value });

    }


    const handleSubmit = (event) => {
        // Prevents page refresh thereby losing info
        event.preventDefault();
        // console.log (`submitted firstname: ${newContact.firstname}`);
        // console.log (`submitted lastname: ${newContact.lastname}`);
        // console.log (`submitted nickname: ${newContact.nickname}`);
        // console.log (`submitted relationship: ${newContact.relationship}`);
        // console.log (`submitted email: ${newContact.email}`);
        // console.log (`submitted mobile: ${newContact.mobile}`);
        dispatch({ type: SAVE_TEMPLATE });

        axios
            .post(`/api/template/add/${state.user.id}`, {
                template: newTemplate.template,
                message: newTemplate.message,
                templates: state.user.id
            })
            .then((response) => {
                // console.log (`posted firstname: ${newContact.firstname}`);
                // console.log (`posted lastname: ${newContact.lastname}`);
                // console.log (`posted nickname: ${newContact.nickname}`);
                // console.log (`posted relationship: ${newContact.relationship}`);
                // console.log (`posted email: ${newContact.email}`);
                // console.log (`posted mobile: ${newContact.mobile}`);
                // console.log (`posted users(the user id): ${state.user.id}`)
                if (response.status === 200) {
                    dispatch(saveTemplate(newTemplate))
                };
            })
            .catch((error) => {
                console.log({ message: error.message });
                console.log(error);
            });

        setNewTemplate({
            templateName: '',
            message: ''
        });
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <h6 className="form-title">Add New Template</h6>
                <div className='validation_wrapper'>
                    <div className="control_wrapper" id="control_wrapper">
                        <form id="addContact" method="post">
                            <div className="form-group" style={{ margin: "10px 0 10px 0" }}>
                                <div className="e-float-input" >
                                    <input
                                        type="text"
                                        id="templateName"
                                        name="templateName"
                                        style={{ width: "100%", }}
                                        placeholder="Template Name"
                                        value={newTemplate.template}
                                        onChange={handleChange}
                                    />
                                    <span className="e-float-line" />
                                </div>
                                <div id="templateNameError" />
                            </div>
                            <div className="form-group" style={{ margin: "0 0 10px 0" }} >
                                <div className="e-float-input">
                                    <input
                                        type="text"
                                        id="message"
                                        name="message"
                                        style={{ width: "100%", height: "200px" }}
                                        placeholder="Message"
                                        value={newTemplate.message}
                                        onChange={handleChange}
                                    />
                                    <span className="e-float-line" />
                                </div>
                                <div id="messageError" />
                            </div>
                            <div className="submitBtn">
                                <button
                                    className="submit-btn e-btn btn btn-lg btn-block"
                                    id="submit-btn"
                                    type="submit"
                                    style={{ width: "100%", height: "70px" }}
                                    style={{ backgroundColor: "#E8C547" }}
                                    onClick={handleSubmit}
                                >
                                    <span style={{ fontSize: "15px" }}>Add Template</span>
                                </button>
                            </div>
                        </form>
                        <div id="confirmationDialog" /> </div>
                </div>
            </div>
        </div>
    )
}

export default AddTemplate;