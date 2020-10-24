// Functional component to handle Loading contacts based on the userID and setting the state variables function
// import React from "react";
import axios from "axios";
import { SET_CONTACTS } from "../../store/actions";
import { useStoreContext } from "../../store/store";
import "../Sidebar/style.css";

export default useLoadContacts = (id) => {
  const [/*state*/, dispatch] = useStoreContext();

  return (
      axios
        .get(`/api/contacts/getall/${id}`)
        .then(response => {
          if (response.status === 200) {
            console.log("useLoadContacts()  has run:", response.data.contacts);
            dispatch({ type: SET_CONTACTS, contacts: response.data.contacts });
          }
        })
        .catch(error => {
          console.log({ message: error.message });
          console.log(error);
        });
  )
};
