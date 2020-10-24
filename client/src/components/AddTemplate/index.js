// Component to hold a contact addition/creation form; functionality for adding a template
import axios from "axios";
import React, { useState } from "react";
import { SAVE_TEMPLATE } from "../../store/actions";
import { useStoreContext } from "../../store/store";

const AddTemplate = () => {
  const [state, dispatch] = useStoreContext();

  const [newTemplate, setNewTemplate] = useState({
    templateName: "",
    message: ""
  });

  console.log("From AddTemplate.js:", state.user.id);

  // Handles updating the new contact whenever a change event or keytroke occurs.
  const handleChange = event => {
    // Sets a generic name and value so that newContact updates whenever any field is updated, and updates the field being with the current value of that field.
    const { name, value } = event.target;
    // Spreads newContact so we don't overwrite the existing info of the field(s) and then sets the value of the field regardless of the value and name of the field (since set generically).
    setNewTemplate({ ...newTemplate, [name]: value });
  };

  const handleSubmit = event => {
    // Prevents page refresh thereby losing info
    event.preventDefault();

    axios
      .post(`/api/templates/add/${state.user.id}`, {
        nickname: newTemplate.templateName,
        val: newTemplate.message,
        UserId: state.user.id
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: SAVE_TEMPLATE, template: newTemplate });
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });

    setNewTemplate({
      templateName: "",
      message: ""
    });
  };

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
                    id="templateName"
                    name="templateName"
                    style={{ width: "100%" }}
                    placeholder="Template Name"
                    value={newTemplate.templateName}
                    onChange={handleChange}
                  />
                  <span className="e-float-line" />
                </div>
                <div id="templateNameError" />
              </div>
              <div className="form-group" style={{ margin: "0 0 10px 0" }}>
                <div className="e-float-input">
                  <input
                    type="text"
                    id="message"
                    name="message"
                    style={{ width: "100%", height: "200px" }}
                    placeholder="Message"
                    value={newTemplate.message}
                    onChange={handleChange}
                  />
                  <span className="e-float-line" />
                </div>
                <div id="messageError" />
              </div>
              <div className="submitBtn">
                <button
                  className="submit-btn e-btn btn btn-lg btn-block"
                  id="submit-btn"
                  type="submit"
                  style={{ width: "100%", height: "70px", backgroundColor: "#E8C547" }}
                  onClick={handleSubmit}
                >
                  <span style={{ fontSize: "15px" }}>Add Template</span>
                </button>
              </div>
            </form>
            <div id="confirmationDialog" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTemplate;
