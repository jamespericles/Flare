// Component that maps through the plans in the db associated with the user and renders them
// provides filtering or viewing options for plans by contacts in them, plans by groups associated with them
import React from 'react';
import { useStoreContext } from '../store/store';

const ListPlans = () => {
    const [state, /*dispatch*/] = useStoreContext();
    
    return (    
        <div>
            <div className="planitem">
                <ul>
                    {state.plans !== null && state.plans.length > 0  ? (state.plans.map((plan, i) => {
                            return(
                                <li key={`plan-${plan.id}`}>
                                  {plan.planname}&nbsp;<button 
                                    // onClick={() => deleteGroup(group.users,group.id)}
                                    >Delete</button>
                                </li>   
                            );})) : (<p>Let prep your flares. Create a plan now!</p>)
                    }                
                </ul>
            </div>
        </div>
    );
}

export default ListPlans;