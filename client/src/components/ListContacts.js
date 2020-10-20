// Component that maps through the contacts in the db associated with the user and renders them
// provides filtering or viewing options for contacts by group, contacts and associated templates, contacts by plan

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useStoreContext } from '../store/store';

const ListContacts = () => {
    const [state, dispatch] = useStoreContext();
    
    return (    
        <div>
            <div className="contactitem">
                <ul>
                    {state.contacts.map((contact, i) => {
                            return(
                                <li key={`contact-${contact.id}`}>
                                  {contact.contactname}&nbsp;<button 
                                    // onClick={() => deleteGroup(group.users,group.id)}
                                    >Delete</button>
                                </li>   
                            );})}                
                </ul>
            </div>
        </div>
    );
}

export default ListContacts;