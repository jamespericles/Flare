// Component to hold a group addition/creation form; functionality for adding a group
// may weave in search and update functionality here if possible

import axios from 'axios';
import React, { useState } from 'react';
// import { select } from '@syncfusion/ej2-base';
// import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
// import { DialogComponent } from '@syncfusion/ej2-react-popups';
// import * as ReactDOM from 'react-dom';
import { LOADING } from '../store/actions';
import { saveGroup } from '../store/actionCreators';
import { useStoreContext } from '../store/store';

const AddGroup = () => {
    const [state, dispatch] = useStoreContext();

    const [newGroup, setNewGroup] = useState({
        groupname: '',
        users: '',
    });

    console.log(state.user.id);

    // Handles updating the new contact whenever a change event or keytroke occurs.
    const handleChange = (event) => {
        // Sets a generic name and value so that newContact updates whenever any field is updated, and updates the field being with the current value of that field.
        const { name, value } = event.target;
        setNewGroup({ ...newGroup, [name]: value });
    }
    
    const handleSubmit = (event) => {
        // Prevents page refresh thereby losing info
        event.preventDefault();
        dispatch({ type: LOADING });

        axios
            .post(`/api/groups/add/${state.user.id}`, {
                groupname: newGroup.groupname,
                users: state.user.id
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(saveGroup(newGroup))
                };
            })
            .catch((error) => {
                console.log({message: error.message});
                console.log(error);
            });

        setNewGroup({
            groupname: '',
            users: '',
            contacts: '',
            plans: '',
        });
    }
    
    return (    
        <div className = 'control-pane'>
            <div className='control-section col-xs-12 col-sm-12 col-md-4'>
                <h4 className="form-title">Add New Group</h4>
                <div className='validation_wrapper'>
                    <div className="control_wrapper" id="control_wrapper">
                        <form id="addGroup"  method="post">
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <label className="e-float-text e-label-top" htmlFor="fistname">Group Name</label>
                                    <input 
                                        type="text" 
                                        id="groupname" 
                                        name="groupname"
                                        value={newGroup.groupname} 
                                        onChange={handleChange} 
                                    />
                                    <span className="e-float-line"/>  
                                </div>
                                <div id="firstnameError"/>
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

export default AddGroup;