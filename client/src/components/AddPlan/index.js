// Component form and axios storecontact component for adding a new plan
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { SAVE_PLAN, SET_PLANS } from "../../store/actions";
import { useStoreContext } from "../../store/store";
import Form, { Control } from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalBody from "react-bootstrap/ModalBody";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalHeader from "react-bootstrap/ModalHeader";
import Button from "react-bootstrap/Button";
import "./style.css";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import { rippleMouseHandler } from "@syncfusion/ej2-buttons";

const AddPlan = () => {
  const [state, dispatch] = useStoreContext();
  const today = new Date();
  const [newPlan, setNewPlan] = useState({
    planname: "",
    isActive: false,
    isHome: false,
    durationBeforeExecution: "",
    activatestart: today,
    activateend: today,
    executeplan: 0,
    UserId: state.user.id,
    // days: 0,
    // hours: 0,
    // minutes: 0,
    // durationCalculated: 0,
    groups: [],
    templates: []
  });
  const [showPlanAddModal, setShowPlanAddModal] = useState(false);
  const [currPlans, setCurrPlans] = useState(state.plans);

  //? The toggle functionality will be handled on the plan item level
  // const [activeToggle, setActiveToggle] = useState(false);
  // const [homeToggle, setHomeToggle] = useState(false)

  console.log(state.user.id);
  // Handles updating the new contact whenever a change event or keytroke occurs.
  const handleChange = event => {
    // Sets a generic name and value so that newContact updates whenever any field is updated, and updates the field being with the current value of that field.
    const { name, value } = event.target;
    setNewPlan({ ...newPlan, [name]: value });
    console.log("newPlan", newPlan);
    let today = new Date();
    // console.log("today", today);
    if (event.target.name === "activatestart" || event.target.name === "activateend") {
      let converted = new Date(event.target.value);
      setNewPlan({ ...newPlan, [name]: converted });
    }
    if (newPlan.activatestart !== 0 && newPlan.activateend !== 0 && newPlan.durationCalculated === 0) {
      // Conversion of the difference between the 2 dates (result in miliseconds) to minutes
      let duration = (newPlan.activateend - newPlan.activatestart) / 60000;
      setNewPlan({ ...newPlan, durationBeforeExecution: duration });
    }
    if (event.target.name === "activatestart") {
      let converted = new Date(event.target.value);
      if (event.target.value !== undefined && event.target.value < today) {
        event.target.value = today;
        setNewPlan({ ...newPlan, [name]: converted });
      }
    }
    if (event.target.name === "activateend") {
      let converted = new Date(event.target.value);
      if (event.target.value !== undefined && event.target.value < today) {
        event.target.value = today;
        setNewPlan({ ...newPlan, [name]: converted });
      }
    }
    if (event.target.name === "minutes") {
      let convertedmin = event.target.value * 60000;
      let convertedhrs = newPlan.hours * 3600000;
      let converteddys = newPlan.days * 86400000;
      let calcDuration = convertedmin + convertedhrs + converteddys;
      setNewPlan({ ...newPlan, durationCalculated: calcDuration });
    }
    if (event.target.name === "hours") {
      let convertedmin = newPlan.minutes * 60000;
      let convertedhrs = event.target.value * 3600000;
      let converteddys = newPlan.days * 86400000;
      let calcDuration = convertedmin + convertedhrs + converteddys;
      setNewPlan({ ...newPlan, durationCalculated: calcDuration });
    }
    if (event.target.name === "days") {
      let convertedmin = newPlan.minutes * 60000;
      let convertedhrs = newPlan.hours * 3600000;
      let converteddys = event.target.value * 86400000;
      let calcDuration = convertedmin + convertedhrs + converteddys;
      let durationInMin = calcDuration / 60000;
      setNewPlan({ ...newPlan, durationCalculated: calcDuration, durationBeforeExecution: durationInMin });
    }
  };
  const handleMultiChange = event => {
    const { options, name } = event.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setNewPlan({ ...newPlan, [name]: selected });
  };

  const handleSubmit = event => {
    //? Keeping in here commented out for including in future iteration
    //? These variables are for converting user-friendlier values to milliseconds for the API to act on.
    // Prevents page refresh thereby losing info
    // let convertedmin = newPlan.minutes * 60000;
    // let convertedhrs = newPlan.hours * 3600000;
    // let converteddys = newPlan.days * 86400000;
    // let calcDuration = convertedmin + convertedhrs + converteddys;
    // let durationInMin = calcDuration / 60000;
    event.preventDefault();

    axios
      .post(`/api/plans/add/${state.user.id}`, {
        planname: newPlan.planname,
        UserId: state.user.id,
        activatestart: newPlan.activatestart,
        activateend: newPlan.activateend,
        durationBeforeExecution: newPlan.durationBeforeExecution,
        executeplan: newPlan.executePlan,
        groups: newPlan.groups,
        templates: newPlan.templates
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: SAVE_PLAN, plan: newPlan });
          setShowPlanAddModal(true);
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });

    setNewPlan({
      ...newPlan,
      planname: "",
      isActive: "",
      durationBeforeExecution: "",
      activatestart: "",
      activateend: "",
      executeplan: "",
      UserId: state.user.id,
      // days: "",
      // hours: "",
      // minutes: "",
      // durationCalculated: ""
      templates: "",
      groups: ""
    });
    loadPlans();
  };

  function loadPlans() {
    axios
      .get(`/api/plans/getallbyuser/${state.user.id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("loadPlans() from ListPlans component has run:", response.data.plans);
          dispatch({ type: SET_PLANS, plans: response.data.plans });
          setCurrPlans(response.data.plans);
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader>
          <ModalTitle id="contained-modal-title-vcenter">Success! New Plan Saved</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>
            Your new plan has been successfully saved. You can add a new plan, or now activate and use this Flare plan
            when you need it.
          </p>
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
            <Form id="addPlan" method="post">
              <Row>
                <Col>
                  <div className="form-group" style={{ margin: "10px 0 10px 0" }}>
                    <Form.Control
                      placeholder="Plan Name"
                      type="text"
                      id="planname"
                      name="planname"
                      value={newPlan.planname}
                      onChange={handleChange}
                      aria-describedby="plannameHelpBlock"
                    />

                    <small id="plannameHelpBlock" className="form-text text-muted" style={{ lineHeight: "1" }}>
                      Your plan name should be a scenario that you quickly and easily recognize like "sketchy place" or
                      "walking home alone"
                    </small>
                  </div>
                </Col>
              </Row>
              <hr />
              <small className="mr-3 text-muted" style={{ lineHeight: "1" }}>
                Assign a default duration for your plan to "watch" before sending a flare. You can also specify a
                date/time to begin watching.
              </small>
              <Row>
                <Col>
                  <div className="form-group" style={{ margin: "10px 0 10px 0" }}>
                    <Form.Control
                      type="text"
                      id="durationBeforeExecution"
                      name="durationBeforeExecution"
                      style={{ width: "100%" }}
                      placeholder="Number of Minutes before sending a Flare"
                      value={newPlan.durationBeforeExecution}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group" style={{ margin: "10px 0 10px 0" }}>
                    <DateTimePickerComponent
                      id="activatestart"
                      name="activatestart"
                      strictMode="true"
                      // key={`dateTimePicker-1-${props.plan.id}`}
                      // planid={`planid-datepicker-activatestart-${props.plan.id}`
                      step="15"
                      min={new Date()}
                      placeholder="Select Start Date &amp; Time."
                      // value={selectedPlan.activatestart}
                      onChange={handleChange}
                      onSelect={handleChange}
                      onBlur={handleChange}
                      onClick={handleChange}
                      onSubmit={handleChange}
                      aria-describedby="activatestartHelpBlock"
                    />
                  </div>
                  <small id="watchtimeHelpBlock" className="form-text text-muted">
                    This is the time when your plan should start "watching"
                  </small>
                </Col>
              </Row>

              <div>
                {state.templates !== null && state.templates.length > 0 ? (
                  <Form.Group controlid="exampleForm.ControlSelect2">
                    <Form.Label className="small text-muted">
                      Select the template this Plan should use if a Flare has to be sent up.
                    </Form.Label>
                    <Form.Control as="select" name="templates" value={newPlan.templates} onChange={handleMultiChange}>
                      {state.templates.map(template => {
                        return (
                          <option key={`template-${template.id}`} value={template.id}>
                            {template.nickname}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                ) : (
                  <p className="small">
                    <Link to="/templates">Create a template</Link> first and then come back here to assign it to your
                    plan.
                  </p>
                )}
              </div>

              <div>
                {state.groups !== null && state.groups.length > 0 ? (
                  <Form.Group controlid="exampleForm.ControlSelect2">
                    <Form.Label className="small text-muted">
                      Select all Groups this Plan should send the assigned flare to. (e.g. CMD or CTRL + Click)
                    </Form.Label>
                    <Form.Control
                      as="select"
                      multiple
                      name="groups"
                      value={newPlan.groups}
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
                    <Link to="/groups">Create a group</Link> first and then assign your contacts to them.
                  </p>
                )}
              </div>

              <div className="submitBtn">
                <button
                  className="submit-btn e-btn btn btn-lg btn-block"
                  id="submit-btn"
                  type="submit"
                  style={{ backgroundColor: "#E8C547" }}
                  onClick={handleSubmit}
                >
                  Add Plan
                </button>
              </div>
            </Form>
            <div id="confirmationDialog" /> <div id="confirmationDialog" />{" "}
            <MyVerticallyCenteredModal
              show={showPlanAddModal}
              onHide={() => {
                setShowPlanAddModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlan;
