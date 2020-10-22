// Component that maps through the contacts in the db associated with the user and renders them
import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../../store/store';
import { SET_CONTACTS } from '../../store/actions';
import { IconContext } from "react-icons";
import { MdRemoveCircle } from 'react-icons/md';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const ListContacts = () => {
    const [state, dispatch] = useStoreContext();
    const [currContacts, setCurrContacts] = useState([state.contacts])

    useEffect(() => {
        loadContacts()
    },[]);

    console.log(currContacts);

    function loadContacts() {
        axios
            .get(`/api/contacts/getall/${state.user.id}`)
            .then((response) => {
            if (response.status === 200) {
                console.log(response.data.contacts);
                setCurrContacts(response.data.contacts);
                dispatch({type: SET_CONTACTS, contacts: response.data.contacts});
            }
            })
            .catch((error) => {
            console.log({message: error.message});
            console.log(error);
        });  
      };
    
    
    function deleteContact(uid,cid) {
        axios
            .delete(`/api/contacts/delete/${uid}/${cid}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Successfully deleted.");
                    loadContacts();
                }
            })
            .catch((error) => {
            console.log({message: error.message});
            console.log(error);
        });
    };


    return (    
        <div>
            <div className="contactitem">
                <ul style={{marginTop: "0", paddingTop: "0"}}>
                    {state.contacts !== null && state.contacts.length > 0  ? (state.contacts.map((contact, i) => {
                            return(
                                <li key={`contact-${contact.id}`}>
                                  <table>
                                    <tbody>
                                        <tr>
                                            <td style={{padding: "0", margin: "0", lineHeight: "1"}}>
                                            <Button
                                                variant="none"
                                                size="sm" 
                                                onClick={() => deleteContact(contact.UserId,contact.id)}
                                                >
                                                <IconContext.Provider value={{ size: "1em", style: { verticalAlign: 'text-top', color: "red", textAlign: "right" }  }}>
                                                    <MdRemoveCircle /> 
                                                </IconContext.Provider>
                                            </Button>{" "}<strong>{contact.nickname}</strong> <span className="small">
                                                (Your {contact.relationship})
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{lineHeight: "1", paddingLeft: "2.3em", paddingTop: "0"}}>
                                               <span className="small">{contact.firstname}&nbsp;{contact.lastname}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{lineHeight: "1", paddingLeft: "2.3em"}}>
                                            <span className="small">{contact.email}&nbsp;|&nbsp;{contact.mobile}</span>
                                            </td>
                                        </tr>
                                    </tbody>     
                                    </table>  
                                  &nbsp;
                                </li>   
                            );})) : (<p className="small">You know you have friends! <Link to="/contacts">Add some now.</Link></p>)      
                    }                         
                </ul>
            </div>
        </div>
    );
}

export default ListContacts;