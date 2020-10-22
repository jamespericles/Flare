// Component that maps through the templates in the db associated with the user and renders them
import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../../store/store';
import { SET_TEMPLATES } from '../../store/actions';
import { IconContext } from "react-icons";
import { MdRemoveCircle } from 'react-icons/md';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const ListTemplates = () => {
    const [state, dispatch] = useStoreContext();
    const [currTemplates, setCurrTemplates] = useState([state.templates])

    useEffect(() => {
        loadTemplates()
    },[]);

    console.log(currTemplates);

    function loadTemplates() {
        axios
            .get(`/api/templates/getallbyuser/${state.user.id}`)
            .then((response) => {
            if (response.status === 200) {
                console.log(response.data.templates);
                setCurrTemplates(response.data.templates);
                dispatch({type: SET_TEMPLATES, templates: response.data.templates});
            }
            })
            .catch((error) => {
            console.log({message: error.message});
            console.log(error);
        });  
    };
    
    function deleteTemplate(uid,tid) {
        axios
            .delete(`/api/templates/delete/${uid}/${tid}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Successfully deleted.");
                    loadTemplates();
                }
            })
            .catch((error) => {
            console.log({message: error.message});
            console.log(error);
        });
    };

    return (    
        <div>
            <div className="templateitem">
                <ul>
                    {state.templates !== null && state.templates.length > 0 ? 
                    (state.templates.map((template, i) => {
                            return (
                                <li key={`template-${template.id}`}>
                                    <Button
                                        variant="none"
                                        size="sm" 
                                        onClick={() => deleteTemplate(template.UserId,template.id)}
                                        >
                                        <IconContext.Provider value={{ size: "1em", style: { verticalAlign: 'text-top', color: "red", textAlign: "right" }  }}>
                                            <MdRemoveCircle /> 
                                        </IconContext.Provider>
                                    </Button>{" "}{template.nickname}
                                </li>   
                            );})) : ( <p className="small"><Link to="/templates">Create a template</Link> and send a message when you need to the most.</p> )
                        }
                </ul>
            </div>
        </div>
    );
}

export default ListTemplates;