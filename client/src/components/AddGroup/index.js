// Component to hold a group addition/creation form; functionality for adding a group
// may weave in search and update functionality here if possible

import axios from 'axios';
import React, { useState } from 'react';
import { SAVE_GROUP } from '../../store/actions';
import { useStoreContext } from '../../store/store';

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
        axios
            .post(`/api/groups/add/${state.user.id}`, {
                groupname: newGroup.groupname,
                users: state.user.id
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: SAVE_GROUP, group: newGroup})
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
            <div className='control-section'>
                
                <div className='validation_wrapper'>
                    <div className="control_wrapper" id="control_wrapper">
                        <form id="addGroup"  method="post">
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <input 
                                        type="text" 
                                        id="groupname" 
                                        name="groupname"
                                        placeholder="Group Name or Nickname"
                                        value={newGroup.groupname} 
                                        style={{ width: "100%"}}
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