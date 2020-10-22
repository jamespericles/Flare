// Component that maps through the contacts in the db associated with the user and renders them
import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../../store/store';
import { SET_GROUPS } from '../../store/actions';
import { IconContext } from "react-icons";
import { MdRemoveCircle } from 'react-icons/md';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const ListGroups = () => {
    const [state, dispatch] = useStoreContext();
    const [currGroups, setCurrGroups] = useState([state.groups])
    
    useEffect(() => {
        loadGroups()
    },[]);

    console.log(currGroups);

    function loadGroups() {
        axios
            .get(`/api/groups/getallbyuser/${state.user.id}`)
            .then((response) => {
            if (response.status === 200) {
                console.log(response.data.groups);
                setCurrGroups(response.data.groups);
                dispatch({type: SET_GROUPS, groups: response.data.groups});
            }
            })
            .catch((error) => {
            console.log({message: error.message});
            console.log(error);
        });  
      };



    function deleteGroup(uid,cid) {
        axios
            .delete(`/api/groups/delete/${uid}/${cid}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Successfully deleted.");
                    loadGroups();
                }
            })
            .catch((error) => {
            console.log({message: error.message});
            console.log(error);
        });
    };


    return (    
        <div>
            <div className="groupitem">
            
                <ul>
                {state.groups !== null && state.groups.length > 0  ? (state.groups.map((group) => {
                            return(
                                <li key={`group-${group.id}`}>
                                    <Button
                                        variant="none"
                                        size="sm" 
                                        onClick={() => deleteGroup(group.UserId,group.id)}
                                        >
                                        <IconContext.Provider value={{ size: "1em", style: { verticalAlign: 'text-top', color: "red", textAlign: "right" }  }}>
                                            <MdRemoveCircle /> 
                                        </IconContext.Provider>
                                    </Button>{" "}{group.groupname}
                                </li>   
                            );})) : (<p className="small">You don't have any groups yet. <Link to="/groups">Get Started!</Link></p>)
                    }                
                </ul>
            </div>
        </div>
    );
}

export default ListGroups;