import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useStoreContext } from '../store/store';

const ListGroups = () => {
    const [state, dispatch] = useStoreContext();
    
    return (    
        <div>
            <div className="groupitem">
                <ul>
                    {state.groups.map((group, i) => {
                            return(
                                <li key={`group-${group.id}`}>
                                  {group.groupname}&nbsp;<button 
                                    // onClick={() => deleteGroup(group.users,group.id)}
                                    >Delete</button>
                                </li>   
                            );})}                
                </ul>
            </div>
        </div>
    );
}

export default ListGroups;