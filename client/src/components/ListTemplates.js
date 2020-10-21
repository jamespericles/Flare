// Component that maps through the templates in the db associated with the user and renders them
// provides filtering or viewing options for templates by plan, group, and contact (per user first and foremost)
import React from 'react';
import { useStoreContext } from '../store/store';

const ListTemplates = () => {
    const [state, /*dispatch*/] = useStoreContext();
    
    return (    
        <div>
            <div className="templateitem">
                <ul>
                    {state.templates !== null ? (state.templates.map((template, i) => {
                            return(
                                <li key={`template-${template.id}`}>
                                  {template.templatename}&nbsp;<button 
                                    // onClick={() => deleteGroup(group.users,group.id)}
                                    >Delete</button>
                                </li>   
                            );})) : (<p>Create a template and send a message when you need to the most.</p>)
                        }
                </ul>
            </div>
        </div>
    );
}

export default ListTemplates;