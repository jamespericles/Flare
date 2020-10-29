// Component that maps through the templates in the db associated with the user and renders them
import React from "react";
import { useStoreContext } from "../../store/store";
import { IconContext } from "react-icons";
import { MdRemoveCircle } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { SET_CONTACTS } from "../../store/actions";

export default function ContactItem(props) {
  const [state, dispatch] = useStoreContext();

  const deleteItem = (uid, itemid) => {
    axios
      .delete(`/api/contacts/delete/${uid}/${itemid}`)
      .then(response => {
        if (response.status === 200) {
          console.log("Successfully deleted.");
          loadContacts();
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  };

  function loadContacts() {
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
  }

  return (
    <div>
      <Card contactid={props.contact.id} className="mb-1" key={`group-${props.contact.id}`}>
        <div className="row">
          <div className="col-10">
            <p className="small ml-2">
              <span className="small text-muted">Nickname:</span>&nbsp;<strong>{props.contact.nickname}</strong>
              <br />
              <span className="text-muted" style={{ fontSize: "80%" }}>
                Relationship: {props.contact.relationship}
              </span>
            </p>
          </div>
          <div className="col-1 pr-1">
            <Button
              variant="none"
              size="sm"
              style={{ textAlign: "right", marginBottom: "0", paddingBottom: "0" }}
              onClick={() => deleteItem(state.user.id, props.contact.id)}
            >
              <IconContext.Provider
                value={{ size: "1em", style: { verticalAlign: "text-top", color: "black", textAlign: "right" } }}
              >
                <MdRemoveCircle />
              </IconContext.Provider>
            </Button>
          </div>
        </div>
        <Card.Body style={{ marginTop: "0", paddingTop: "0" }}>
          <div className="small ml-2" style={{ lineHeight: "1", paddingTop: "0" }}>
            <span className="small">
              {props.contact.firstname}&nbsp;{props.contact.lastname}
            </span>
            <br />
            <span className="small">
              {props.contact.email}&nbsp;|&nbsp;{props.contact.mobile}
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
