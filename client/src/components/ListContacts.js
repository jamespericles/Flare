// Component that maps through the contacts in the db associated with the user and renders them
// provides filtering or viewing options for contacts by group, contacts and associated templates, contacts by plan
import React from 'react';
import { useStoreContext } from '../store/store';

const ListContacts = () => {
    const [state, /*dispatch*/] = useStoreContext();
    
    return (    
        <div>
            <div className="contactitem">
                <ul>
                    {state.contacts !== null ? (state.contacts.map((contact, i) => {
                            return(
                                <li key={`contact-${contact.id}`}>
                                  {contact.contactname}&nbsp;<button 
                                    // onClick={() => deleteGroup(group.users,group.id)}
                                    >Delete</button>
                                </li>   
                            );})) : (<p>You know you have friends! Add some now.</p>)      
                    }                         
                </ul>
            </div>
        </div>
    );
}

export default ListContacts;