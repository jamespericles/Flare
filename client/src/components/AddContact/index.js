// Component to hold a contact addition/creation form; functionality for adding a contact
import axios from "axios";
import React, { useState } from "react";
import { LOADING, SAVE_CONTACT } from "../../store/actions";
import { useStoreContext } from "../../store/store";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalBody from "react-bootstrap/ModalBody";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalHeader from "react-bootstrap/ModalHeader";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const AddContact = () => {
  const [state, dispatch] = useStoreContext();

  const [newContact, setNewContact] = useState({
    firstname: "",
    lastname: "",
    nickname: "",
    relationship: "",
    email: "",
    mobile: "",
    groups: []
  });

  const [showContactAddModal, setShowContactAddModal] = useState(false);

  const [preventSubmit, setPreventSubmit] = useState(true);
  // Handles updating the new contact whenever a change event or keytroke occurs.
  const handleChange = event => {
    // Sets a generic name and value so that newContact updates whenever any field is updated,
    // and updates the field being with the current value of that field.
    const { name, value } = event.target;
    console.log(name, value);
    setNewContact({ ...newContact, [name]: value });
    if (
      newContact.firstname !== "" &&
      newContact.lastname !== "" &&
      newContact.nickname !== "" &&
      newContact.relationship !== "" &&
      newContact.email !== "" &&
      newContact.mobile !== ""
    ) {
      setPreventSubmit(false);
    }
  };

  const handleMultiChange = event => {
    const { options, name } = event.target;

    const selected = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }

    setNewContact({ ...newContact, [name]: selected });
  };

  const handleSubmit = event => {
    // Prevents page refresh thereby losing info
    event.preventDefault();
    dispatch({ type: LOADING });
    axios
      .post(`/api/contacts/add/${state.user.id}`, {
        firstname: newContact.firstname,
        lastname: newContact.lastname,
        nickname: newContact.nickname,
        relationship: newContact.relationship,
        email: newContact.email,
        mobile: newContact.mobile,
        UserId: state.user.id,
        groups: newContact.groups
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: SAVE_CONTACT, contact: newContact });
          setShowContactAddModal(true);
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
    setNewContact({
      firstname: "",
      lastname: "",
      nickname: "",
      relationship: "",
      email: "",
      mobile: ""
    });
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader>
          <ModalTitle id="contained-modal-title-vcenter">Modal heading</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <h4>Success! New Contact Saved</h4>
          <p>Your new contact has been successfully saved to your contacts. Now add another!</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onHide}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="validation_wrapper">
          <div className="control_wrapper" id="control_wrapper">
            <form id="addContact" method="post">
              <div className="form-group" style={{ margin: "10px 0 10px 0" }}>
                <div className="e-float-input">
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    style={{ width: "100%" }}
                    placeholder="First Name"
                    value={newContact.firstname}
                    onChange={handleChange}
                  />
                  <span className="e-float-line" />
                </div>
                <div id="firstnameError" />
              </div>
              <div className="form-group" style={{ margin: "0 0 10px 0" }}>
                <div className="e-float-input">
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    style={{ width: "100%" }}
                    placeholder="Last Name"
                    value={newContact.lastname}
                    onChange={handleChange}
                  />
                  <span className="e-float-line" />
                </div>
                <div id="lastnameError" />
              </div>
              <div className="form-group" style={{ margin: "0 0 10px 0" }}>
                <div className="e-float-input">
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    style={{ width: "100%" }}
                    placeholder="Nickname"
                    value={newContact.nickname}
                    onChange={handleChange}
                  />
                </div>
                <div id="nicknameError" />
              </div>
              <div className="form-group" style={{ margin: "0 0 10px 0" }}>
                <div className="e-float-input">
                  <input
                    type="text"
                    id="relationship"
                    name="relationship"
                    style={{ width: "100%" }}
                    placeholder="Relationship (e.g. Father, Boyfriend, Neighbor)"
                    value={newContact.relationship}
                    onChange={handleChange}
                  />
                </div>
                <div id="relationshipError" />
              </div>
              <div className="form-group" style={{ margin: "0 0 10px 0" }}>
                <div className="e-float-input">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    style={{ width: "100%" }}
                    placeholder="Email address"
                    value={newContact.email}
                    onChange={handleChange}
                  />
                </div>
                <div id="emailError" />
              </div>
              <div className="form-group" style={{ margin: "0 0 10px 0" }}>
                <div className="e-float-input">
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    style={{ width: "100%" }}
                    placeholder="Mobile Phone"
                    value={newContact.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div id="mobileError" />
              </div>
              <div className="form-group" style={{ margin: "0 0 10px 0" }}>
                <div className="e-float-input">
                  <input
                    type="text"
                    id="GroupId"
                    name="GroupId"
                    style={{ width: "100%" }}
                    placeholder="Select all Groups this Contact should be included in"
                    value={newContact.GroupId}
                    onChange={handleChange}
                  />
                </div>
                {state.groups !== null && state.groups.length > 0 ? (
                  <Form.Group controlId="exampleForm.ControlSelect2">
                    <p className="small text-muted">Multi-Select Group Assignment. (e.g. CMD or CTRL + Click)</p>
                    <Form.Label>Example multiple select</Form.Label>
                    <Form.Control
                      as="select"
                      multiple
                      name="groups"
                      value={newContact.groups}
                      onChange={handleMultiChange}
                    >
                      {state.groups.map(group => {
                        return (
                          <option key={`group-${group.id}`} value={group.id}>
                            {group.groupname}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                ) : (
                  <p className="small">
                    <Link to="/templates">Create a group</Link> first and then assign your contacts to them.
                  </p>
                )}
              </div>
              <div className="submitBtn">
                <button
                  className="submit-btn e-btn btn btn-lg btn-block"
                  id="submit-btn"
                  type="submit"
                  style={{
                    backgroundColor: "#E8C547"
                  }}
                  disabled={preventSubmit}
                  onClick={handleSubmit}
                >
                  <span style={{ fontSize: "15px" }}>Add Contact</span>
                </button>
              </div>
            </form>
            <div id="confirmationDialog" />{" "}
            <MyVerticallyCenteredModal
              show={showContactAddModal}
              onHide={() => {
                setShowContactAddModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
