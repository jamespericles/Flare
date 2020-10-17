import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { LOADING, UNSET_USER } from '../store/actions';
import { useStoreContext } from '../store/store';
import { IconContext } from "../../../node_modules/react-icons";
import { MdExitToApp } from '../../node_modules/react-icons/md';
import "./Sidebar/style.css";

  const Logout = () => {
    const [, dispatch] = useStoreContext();
    const history = useHistory();
  
    const logout = (event) => {
      event.preventDefault();
  
      dispatch({ type: LOADING });
  
      axios
        .get('/api/users/logout')
        .then((response) => {
          if (response.status === 200) {
            dispatch({ type: UNSET_USER });
            history.replace('/login');
          }
        })
        .catch((error) => {
          console.log('Logout error');
        });
    };
  
    return (
        <>
            <Link to="#" className="btn btn-link sidebarLinks" onClick={logout}>
                <span>
                    <IconContext.Provider value={{ size: "1em", style: { verticalAlign: 'text-top', color: "default" }  }}>
                        <MdExitToApp /> 
                    </IconContext.Provider> Logout</span>
            </Link>
        </>
    );
}

export default Logout;