// Component form and axios storecontact component for adding a new plan
// Also possible search and filter function and update function for existing plans in this same component if possible

// Component to hold a group addition/creation form; functionality for adding a group
// may weave in search and update functionality here if possible

import axios from 'axios';
import React, { useState } from 'react';
// import { select } from '@syncfusion/ej2-base';
// import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
// import { DialogComponent } from '@syncfusion/ej2-react-popups';
// import * as ReactDOM from 'react-dom';
import { LOADING } from '../store/actions';
import { savePlan } from '../store/actionCreators';
import { useStoreContext } from '../store/store';

const AddPlan = () => {
    const [state, dispatch] = useStoreContext();

    const [newPlan, setNewPlan] = useState({
        planname: '',
        isActive: 'false',
        isHome: 'false',
        durationBeforeExecutation: '',
        activatestart: '',
        activateend: '',
        executeplan: 'false',
        users: '',
        contacts: '',
        groups: '',
    });

    console.log(state.user.id);

    // Handles updating the new contact whenever a change event or keytroke occurs.
    const handleChange = (event) => {
        // Sets a generic name and value so that newContact updates whenever any field is updated, and updates the field being with the current value of that field.
        const { name, value } = event.target;
        setNewPlan({ ...newPlan, [name]: value });
    }
    
    const handleSubmit = (event) => {
        // Prevents page refresh thereby losing info
        event.preventDefault();
        dispatch({ type: LOADING });

        axios
            .post(`/api/plans/add/${state.user.id}`, {
                planname: newPlan.planname,
                users: state.user.id
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(savePlan(newPlan))
                };
            })
            .catch((error) => {
                console.log({message: error.message});
                console.log(error);
            });

        setNewGroup({
            plannname: '',
            isActive: 'false',
            isHome: 'false',
            durationBeforeExecution: '',
            activatestart: '',
            activateend: '',
            executeplan: 'false',
            users: state.user.id,
            contacts: '',
            groups: '',
        });
    }
    
    return (    
        <div className = 'control-pane'>
            <div className='control-section col-xs-12 col-sm-12 col-md-4'>
                <h4 className="form-title">Add New Plan</h4>
                <div className='validation_wrapper'>
                    <div className="control_wrapper" id="control_wrapper">
                        <form id="addPlan"  method="post">
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="Plan Name">Plan Name</label>
                                    <input 
                                        type="text" 
                                        id="planname" 
                                        name="planname"
                                        value={newPlan.planname} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>  
                                </div>
                                <div id="plannameError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="Plan Name">Activate?</label>
                                    <input 
                                        type="text" 
                                        id="planname" 
                                        name="planname"
                                        value={newPlan.isActive} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>  
                                </div>
                                <div id="isActiveError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="Is Home">Is Home</label>
                                    <input 
                                        type="text" 
                                        id="isHome" 
                                        name="isHome"
                                        value={newPlan.isHome} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>  
                                </div>
                                <div id="isHomeError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="Duration Before Executing">Duration Before Executing</label>
                                    <input 
                                        type="text" 
                                        id="durationBeforeExecution" 
                                        name="durationBeforeExecution"
                                        value={newPlan.durationBeforeExecution} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>  
                                </div>
                                <div id="durationBeforeExecutionError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="Activation Start">Activation Start</label>
                                    <input 
                                        type="text" 
                                        id="activationStart" 
                                        name="activationStarte"
                                        value={newPlan.planname} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>  
                                </div>
                                <div id="activationstartError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="Activation End">Activation End</label>
                                    <input 
                                        type="text" 
                                        id="activationend" 
                                        name="activationend"
                                        value={newPlan.activationend} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>  
                                </div>
                                <div id="activationendError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="Execute Plan">Execute Plan</label>
                                    <input 
                                        type="text" 
                                        id="executeplan" 
                                        name="executeplan"
                                        value={newPlan.executeplan} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>  
                                </div>
                                <div id="executeplanError"/>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="Plan Name">Plan Name</label>
                                    <input 
                                        type="text" 
                                        id="planname" 
                                        name="planname"
                                        value={newPlan.planname} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>  
                                </div>
                                <div id="plannameError"/>
                            </div>                        
                            <div className="submitBtn">
                            <button 
                                className="submit-btn e-btn btn btn-lg btn-block" 
                                id="submit-btn" 
                                type="submit" 
                                style={{ backgroundColor: "#E8C547" }}
                                onClick={handleSubmit}
                            >
                                Add Group
                            </button>
                        </div>
                        </form>
                        <div id="confirmationDialog"/> </div>
                    </div>
                </div>
        </div>
    ) 
}

export default AddPlan;