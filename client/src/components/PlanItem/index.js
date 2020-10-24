// Component that maps through the templates in the db associated with the user and renders them
import React, { useEffect, useState } from "react";
import { useStoreContext } from "../../store/store";
import { SAVE_PLAN, SET_PLANS } from "../../store/actions";
import { IconContext } from "react-icons";
import { MdRemoveCircle } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";

export default function PlanItem(props) {
  const [state, dispatch] = useStoreContext();
  const [selectedPlan, setSelectedPlan] = useState({
    id: props.plan.id,
    planname: props.plan.planname,
    isActive: props.plan.isActive,
    isHome: props.plan.isHome,
    durationBeforeExecution: props.plan.durationBeforeExecution,
    activatestart: props.plan.activatestart,
    activateend: props.plan.activateend,
    executeplan: props.plan.executeplan,
    contacts: props.plan.contacts,
    groups: props.plan.groups,
    UserId: props.plan.UserId
  });

  useEffect(() => {
    setSelectedPlan(props.plan);
  }, [props.plan]);

  function loadPlans() {
    axios
      .get(`/api/plans/getallbyuser/${state.user.id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("loadPlans() from ListPlans component has run:", response.data.plans);
          dispatch({ type: SET_PLANS, plans: response.data.plans });
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  }

  const handleActiveToggle = () => {
    if (Form.Check.activeToggle === "on") {
      setSelectedPlan({ ...selectedPlan, isActive: true });
      axios
        .put(`/api/plans/update/${state.user.id}/${selectedPlan.id}`, { ...selectedPlan, isActive: true })
        .then(response => {
          if (response.status === 200) {
            dispatch({ type: SAVE_PLAN, plan: selectedPlan });
            console.log("response after update", response);
          }
        })
        .catch(error => {
          console.log({ message: error.message });
          console.log(error);
        });
    } else {
      setSelectedPlan({ ...selectedPlan, isActive: false });
      axios
        .put(`/api/plans/update/${state.user.id}/${selectedPlan.id}`, { ...selectedPlan, isActive: false })
        .then(response => {
          if (response.status === 200) {
            dispatch({ type: SAVE_PLAN, plan: selectedPlan });
            console.log("response after update", response);
          }
        })
        .catch(error => {
          console.log({ message: error.message });
          console.log(error);
        });
    }
    console.log("selectedPlan after isActive Toggle", selectedPlan);
  };

  const handleHomeToggle = () => {
    if (Form.Check.homeToggle === "on") {
      setSelectedPlan({ ...selectedPlan, isHome: true });
      axios
        .put(`/api/plans/update/${state.user.id}/${selectedPlan.id}`, { ...selectedPlan, isHome: true })
        .then(response => {
          if (response.status === 200) {
            dispatch({ type: SAVE_PLAN, plan: selectedPlan });
            console.log("response after update", response);
          }
        })
        .catch(error => {
          console.log({ message: error.message });
          console.log(error);
        });
    } else {
      setSelectedPlan({ ...selectedPlan, isHome: false });
      axios
        .put(`/api/plans/update/${state.user.id}/${selectedPlan.id}`, { ...selectedPlan, isHome: false })
        .then(response => {
          if (response.status === 200) {
            dispatch({ type: SAVE_PLAN, plan: selectedPlan });
            console.log("response after update", response);
          }
        })
        .catch(error => {
          console.log({ message: error.message });
          console.log(error);
        });
    }
    console.log("selectedPlan After isHome Toggle", selectedPlan);
  };

  const deleteItem = (uid, itemid) => {
    axios
      .delete(`/api/plans/delete/${uid}/${itemid}`)
      .then(response => {
        if (response.status === 200) {
          console.log("Successfully deleted.");
          loadPlans();
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setSelectedPlan({ ...selectedPlan, [name]: value });
  };

  // function run on submit of the activatestart activateed selection
  const handleSubmit = event => {
    const newduration = selectedPlan.activateend - selectedPlan.activatestart;
    event.preventDefault();
    axios
      .put(`/api/plans/update/${state.user.id}/${selectedPlan.id}`, {
        id: selectedPlan.id,
        planname: selectedPlan.planname,
        isActive: selectedPlan.isActive,
        isHome: selectedPlan.isHome,
        durationBeforeExecution: newduration,
        activatestart: new Date(selectedPlan.activatestart),
        activateend: new Date(selectedPlan.activateend),
        executeplan: selectedPlan.executeplan,
        UserId: state.user.id,
        contacts: selectedPlan.contacts,
        groups: selectedPlan.groups
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: SAVE_PLAN, plan: selectedPlan });
          console.log("response after update", response);
        }
      })
      .catch(error => {
        console.log({ message: error.message });
        console.log(error);
      });
  };

  // function to set the minimum selectable date to no earlier than today.
  const getnow = () => {
    return Date.now();
  };
  const tday = getnow();
  const activateTrue = selectedPlan.activatestart < tday ? "Not Scheduled" : selectedPlan.activatestart;
  const activateEndTrue = selectedPlan.activateend < tday ? "Not Scheduled" : selectedPlan.activateend;
  const newdurationBeforeExecution =
    selectedPlan.durationBeforeExecution === null ? "Duration Not Set" : selectedPlan.durationBeforeExecution;

  return (
    <div>
      <Card planid={props.plan.id} className="mb-1" key={`plan-${props.plan.id}`}>
        <div className="row">
          <div className="col-10">
            &nbsp;
            <small>
              <strong>{props.plan.planname}</strong>
            </small>
          </div>
          <div className="col-1 pr-1">
            <Button
              variant="none"
              size="sm"
              style={{ textAlign: "right", marginBottom: "0", paddingBottom: "0" }}
              onClick={() => deleteItem(state.user.id, props.plan.id)}
            >
              <IconContext.Provider
                value={{ size: "1em", style: { verticalAlign: "text-top", color: "red", textAlign: "right" } }}
              >
                <MdRemoveCircle />
              </IconContext.Provider>
            </Button>
          </div>
        </div>
        <Card.Body style={{ marginTop: "0", paddingTop: "0" }}>
          <Tabs className="tabnav" variant="pills" defaultActiveKey={`plan1-${props.plan.id}`}>
            <Tab eventKey={`plan1-${props.plan.id}`} title="Activate">
              <div className="mt-2">
                <p className="small" style={{ lineHeight: "1" }}>
                  Once your{" "}
                  <strong>
                    <em>{props.plan.planname}</em>
                  </strong>{" "}
                  Flare plan is ready to turn on, you can activate it below.
                </p>
                <p className="small text-muted" style={{ lineHeight: "1" }}>
                  <strong>Plan Name:</strong> {props.plan.planname} <br />
                  <strong>Watch Duration:</strong> {newdurationBeforeExecution} <br />
                  <span className="text-muted" style={{ fontSize: "80%" }}>
                    The length of time your plan watches and waits, after which it sends your flare template.
                  </span>{" "}
                  <br />
                  <strong>Scheduled Start:</strong> {activateTrue} <br />
                  <span className="text-muted" style={{ fontSize: "80%" }}>
                    Instead of turning on manually, you can schedule your plan to start watching at a specific time and
                    date.
                  </span>{" "}
                  <br />
                  <strong>Scheduled End:</strong> {activateEndTrue} <br />
                  <span className="text-muted" style={{ fontSize: "80%" }}>
                    You can can schedule a specific end-time if you've decided when you'll turn your plan off, and if it
                    isn't off then it should definitely alert your contacts.
                  </span>{" "}
                  <br />
                </p>
              </div>

              <Row className="mt-4">
                <Col>
                  <span clasName="small">
                    <strong>Activate Plan Now</strong>
                  </span>
                  <Form.Switch name="activeToggle" onClick={handleActiveToggle} id="activeToggle" />{" "}
                </Col>
                <Col>
                  <span clasName="small">
                    <strong>Activate When Leave Home</strong>
                  </span>
                  <Form.Switch name="homeToggle" onClick={handleHomeToggle} id="homeToggle" />
                </Col>
              </Row>
            </Tab>

            <Tab eventKey={`plan2-${props.plan.id}`} title="Schedule">
              <div className="mt-2">
                <p className="small" style={{ lineHeight: "1" }}>
                  Ready to schedule your plan?Set the activation start date/time and the plan's watch duration below.
                </p>
                <Form id="addDates" method="post">
                  <Row className="mt-4 mb-4">
                    <Col>
                      <DateTimePickerComponent
                        id="activatestart"
                        name="activatestart"
                        strictMode="true"
                        key="dateTimePicker-1"
                        planid={props.plan.id}
                        planname={props.plan.planname}
                        step="15"
                        min={getnow}
                        placeholder="Select Start Date &amp; Time."
                        onChange={handleChange}
                        value={selectedPlan.activatestart}
                        aria-describedby="activatestartHelpBlock"
                      />
                      <small id="plannameHelpBlock" className="form-text text-muted">
                        This is the time when your plan should start "watching"
                      </small>
                    </Col>
                    <Col>
                      <DateTimePickerComponent
                        id="activateend"
                        name="activateend"
                        key="dateTimePicker-2"
                        planid={props.plan.id}
                        planname={props.plan.planname}
                        step="15"
                        min={getnow}
                        placeholder="Select End Date &amp; Time."
                        onChange={handleChange}
                        value={selectedPlan.activateend}
                        aria-describedby="activateendHelpBlock"
                      />
                      <small id="plannameHelpBlock" className="form-text text-muted">
                        This is when your plan should stop watching &amp; send your template to your group.
                      </small>
                    </Col>
                  </Row>
                  <div className="submitBtn">
                    <button
                      className="submit-btn e-btn btn btn-lg btn-block"
                      id="submit-btn"
                      type="submit"
                      planid={props.plan.id}
                      style={{ backgroundColor: "#E8C547" }}
                      onClick={handleSubmit}
                    >
                      Update Plan
                    </button>
                  </div>
                </Form>
              </div>
            </Tab>
            <Tab eventKey={`plan3-${props.plan.id}`} title="Set Groups">
              <div className="mt-2">
                <p className="small" style={{ lineHeight: "1" }}>
                  Add Groups to your Plan to be sure all the right individuals know it when your plan up a flare.
                </p>
              </div>
            </Tab>
            <Tab eventKey={`plan4-${props.plan.id}`} title="Assign Template">
              <div className="mt-2">
                <p className="small" style={{ lineHeight: "1" }}>
                  Assign a customized template to your plan that your group contacts will receive if your plan ignites a
                  flare.
                </p>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
}
