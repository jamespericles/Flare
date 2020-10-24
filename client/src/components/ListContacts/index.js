// Component that maps through the contacts in the db associated with the user and renders them
import React, { useEffect } from "react";
import { useStoreContext } from "../../store/store";
import { SET_CONTACTS } from "../../store/actions";
import { Link } from "react-router-dom";
import axios from "axios";
import ContactItem from "../ContactItem";

const ListContacts = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    axios
      .get(`/api/contacts/getall/${state.user.id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("loadContacts() from ListCotacts.js has run:", response.data.contacts);
          dispatch({ type: SET_CONTACTS, contacts: response.data.contacts });
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  }, [dispatch, state.user.id]);

  // function loadContacts() {
  //   axios
  //     .get(`/api/contacts/getall/${state.user.id}`)
  //     .then(response => {
  //       if (response.status === 200) {
  //         console.log("loadContacts() from ListCotacts.js has run:", response.data.contacts);
  //         dispatch({ type: SET_CONTACTS, contacts: response.data.contacts });
  //       }
  //     })
  //     .catch(error => {
  //       console.log({ message: error.message });
  //       console.log(error);
  //     });
  // }

  // const deleteItem = (uid, itemid) => {
  //   axios
  //     .delete(`/api/contacts/delete/${uid}/${itemid}`)
  //     .then(response => {
  //       if (response.status === 200) {
  //         console.log("Successfully deleted.");
  //         loadContacts();
  //       }
  //     })
  //     .catch(error => {
  //       console.log({ message: error.message });
  //       console.log(error);
  //     });
  // };

  return (
    <div>
      <div className="contactitem">
        <ul style={{ marginTop: "0", paddingTop: "0" }}>
          {state.contacts !== null && state.contacts.length > 0 ? (
            state.contacts.map((contact, i) => {
              return <ContactItem contact={contact} />;
            })
          ) : (
            <p className="small">
              You know you have friends! <Link to="/contacts">Add some now.</Link>
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListContacts;
