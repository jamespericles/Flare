import React from 'react';
import { useStoreContext } from '../store/store';

const ListGroups = () => {
    const [state, /*dispatch*/] = useStoreContext();
    
    return (    
        <div>
            <div className="groupitem">
                <ul>
                {state.groups ? (state.groups.map((group) => {
                            return(
                                <li key={`group-${group.id}`}>
                                  {group.groupname}&nbsp;<button 
                                    // onClick={() => deleteGroup(group.users,group.id)}
                                    >Delete</button>
                                </li>   
                            );})) : (<p>You don't have any groups yet.<br/>Get Started! Add a new Group below.</p>)
                    }                
                </ul>
            </div>
        </div>
    );
}

export default ListGroups;