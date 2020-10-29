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
// import FormSwitch from "react-bootstrap/Switch";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";

import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import { rippleMouseHandler } from "@syncfusion/ej2-buttons";

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
  const [isChecked, setIsChecked] = useState(selectedPlan.isActive);

  useEffect(() => {
    setSelectedPlan(props.plan);
  }, [props.plan, selectedPlan]);

  let elemArray: NodeListOf<Element> = document.querySelectorAll(".switch-control label");
  for (let i: number = 0, len: number = elemArray.length; i < len; i++) {
    elemArray[i].addEventListener("mouseup", rippleHandler);
    elemArray[i].addEventListener("mousedown", rippleHandler);
  }
  function rippleHandler(e: MouseEvent): void {
    let rippleSpan: Element = this.nextElementSibling.querySelector(".e-ripple-container");
    if (rippleSpan) {
      rippleMouseHandler(e, rippleSpan);
    }
  }

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

  const handleActiveSwitch = event => {
    // const { name, value } = event.target;
    const newduration = selectedPlan.activateend - selectedPlan.activatestart;
    if (isChecked === false) {
      setIsChecked(true);
      setSelectedPlan({ ...selectedPlan, isActive: true });
      axios
        .put(`/api/plans/update/${state.user.id}/${selectedPlan.id}`, {
          id: selectedPlan.id,
          planname: selectedPlan.planname,
          isActive: true,
          isHome: selectedPlan.isHome,
          durationBeforeExecution: newduration,
          activatestart: selectedPlan.activatestart,
          activateend: selectedPlan.activateend,
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
    } else {
      setIsChecked(false);
      setSelectedPlan({ ...selectedPlan, isActive: false });
      // event.preventDefault();
      axios
        .put(`/api/plans/update/${state.user.id}/${selectedPlan.id}`, {
          id: selectedPlan.id,
          planname: selectedPlan.planname,
          isActive: false,
          isHome: selectedPlan.isHome,
          durationBeforeExecution: newduration,
          activatestart: selectedPlan.activatestart,
          activateend: selectedPlan.activateend,
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
    }
    // handleSubmit(event);
    console.log("after submission, based on switching isActive:", selectedPlan);
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
        activatestart: selectedPlan.activatestart,
        activateend: selectedPlan.activateend,
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
  // const getnow = () => {
  //   return Date.now();
  // };
  const tday = new Date();
  const tdayMili = tday.getMilliseconds();
  console.log("tday", tday);
  const convertStartDate = new Date(selectedPlan.activatestart);
  const activateStartMili = convertStartDate.getMilliseconds();
  const convertedStartDate = convertStartDate.toLocaleString();
  const activateTrue = activateStartMili < tdayMili ? "Not Scheduled" : convertedStartDate;
  const convertEndDate = new Date(selectedPlan.activateend);
  const activateEndMili = convertEndDate.getMilliseconds();
  const convertedEndDate = convertEndDate.toLocaleString();
  const activateEndTrue = activateEndMili < tdayMili ? "Not Scheduled" : convertedEndDate;
  const newdurationBeforeExecution =
    selectedPlan.durationBeforeExecution === null ? "Duration Not Set" : selectedPlan.durationBeforeExecution;

  console.log("convertedStartDate:", convertedStartDate);

  return (
    <div>
      <Card key={`planitemcard-${props.plan.id}`} planid={`planid-${props.plan.id}`} className="mb-1">
        <div key={`planitem-cardlevel-div1-row-${props.plan.id}`} className="row">
          <div key={`planitem-cardlevel-div1-col-${props.plan.id}`} className="col-10">
            &nbsp;
            <small key={`planname-${props.plan.id}`}>
              <strong>{props.plan.planname}</strong>
            </small>
          </div>
          <div key={`planitem-cardlevel-div2-col-${props.plan.id}`} className="col-1 pr-1">
            <Button
              key={`planitem-delete-${props.plan.id}`}
              variant="none"
              size="sm"
              style={{ textAlign: "right", marginBottom: "0", paddingBottom: "0" }}
              onClick={() => deleteItem(state.user.id, props.plan.id)}
            >
              <IconContext.Provider
                key={`planitemdeleteiconcontext-${props.plan.id}`}
                value={{ size: "1em", style: { verticalAlign: "text-top", color: "black", textAlign: "right" } }}
              >
                <MdRemoveCircle key={`planitemcircleicon-${props.plan.id}`} />
              </IconContext.Provider>
            </Button>
          </div>
        </div>
        <Card.Body key={`planitemcardbody-${props.plan.id}`} style={{ marginTop: "0", paddingTop: "0" }}>
          <Tabs
            key={`planitemtabs-${props.plan.id}`}
            className="tabnav"
            variant="pills"
            defaultActiveKey={`plan1-${props.plan.id}`}
          >
            <Tab key={`turnontab-${props.plan.id}`} eventKey={`plan1-${props.plan.id}`} title="Activate">
              <div key={`turnontab-div1-${props.plan.id}`} className="mt-2">
                <p key={`turnontab-p1-${props.plan.id}`} className="small" style={{ lineHeight: "1" }}>
                  Once your{" "}
                  <strong>
                    <em>{props.plan.planname}</em>
                  </strong>{" "}
                  Flare plan is ready to turn on, you can activate it below.
                </p>
                <p key={`turnontab-p2-${props.plan.id}`} className="small text-muted" style={{ lineHeight: "1" }}>
                  <strong>Plan Name:</strong> {props.plan.planname} <br />
                  <strong>Watch Duration:</strong> {newdurationBeforeExecution} <br />
                  <span key={`turnontab-span1-${props.plan.id}`} className="text-muted" style={{ fontSize: "80%" }}>
                    The length of time your plan watches and waits, after which it sends your flare template.
                  </span>{" "}
                  <br />
                  <strong>Scheduled Start:</strong> {activateTrue} <br />
                  <span key={`turnontab-span2-${props.plan.id}`} className="text-muted" style={{ fontSize: "80%" }}>
                    Instead of turning on manually, you can schedule your plan to start watching at a specific time and
                    date.
                  </span>{" "}
                  <br />
                  <strong>Scheduled End:</strong> {activateEndTrue} <br />
                  <span key={`turnontab-span3-${props.plan.id}`} className="text-muted" style={{ fontSize: "80%" }}>
                    You can can schedule a specific end-time if you've decided when you'll turn your plan off, and if it
                    isn't off then it should definitely alert your contacts.
                  </span>{" "}
                  <br />
                </p>
              </div>
              <Row key={`activatenowrow-${props.plan.id}`} className="mt-4">
                <Col key={`activatenowcol-${props.plan.id}`}>
                  <hr />
                  <div key={`activatenowtoggle-${props.plan.id}`}>
                    <label
                      className=".switch-control"
                      htmlFor={`activatenowchecked-${props.plan.id}`}
                      style={{ padding: "10px 72px 10px 0", textAlign: "left" }}
                    >
                      <span className="pr-0 mr-0">
                        <strong>Activate Plan Now:</strong>
                      </span>
                    </label>
                    <SwitchComponent
                      id={`activatenowchecked-${props.plan.id}`}
                      name="activeToggle"
                      value={selectedPlan.isActive}
                      checked={isChecked}
                      onChange={handleActiveSwitch}
                    ></SwitchComponent>
                  </div>
                </Col>
              </Row>
            </Tab>

            <Tab key={`activatestart-Tab-${props.plan.id}`} eventKey={`plan2-${props.plan.id}`} title="Schedule">
              <div key={`activatestart-div1-${props.plan.id}`} className="mt-2">
                <p key={`activatestart-p1-${props.plan.id}`} className="small" style={{ lineHeight: "1" }}>
                  Ready to schedule your plan?Set the activation start date/time and the plan's watch duration below.
                </p>
                <Form key={`activatestart-Form-${props.plan.id}`} id="addDates" method="post">
                  <Row key={`activatestart-Row-${props.plan.id}`} className="mt-4 mb-4">
                    <Col key={`activatestart-Col-${props.plan.id}`}>
                      <DateTimePickerComponent
                        id="activatestart"
                        name="activatestart"
                        strictMode="true"
                        key={`dateTimePicker-1-${props.plan.id}`}
                        planid={`planid-datepicker-activatestart-${props.plan.id}`}
                        planname={`activatestart-${props.plan.planname}`}
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
                      <small
                        key={`watchtime-small-${props.plan.id}`}
                        id="watchtimeHelpBlock"
                        className="form-text text-muted"
                      >
                        This is the time when your plan should start "watching"
                      </small>
                    </Col>
                    <Col key={`activateend-Col-${props.plan.id}`}>
                      <DateTimePickerComponent
                        id="activateend"
                        name="activateend"
                        key={`dateTimePicker-2-${props.plan.id}`}
                        planid={`planid-datepicker-activateend-${props.plan.id}`}
                        planname={`activateend-${props.plan.planname}`}
                        step="15"
                        placeholder="Select End Date &amp; Time."
                        // value={selectedPlan.activateend}
                        onChange={handleChange}
                        onSelect={handleChange}
                        onSubmit={handleChange}
                        aria-describedby="activateendHelpBlock"
                      />
                      <small
                        key={`watchtimeendblock-Tab-${props.plan.id}`}
                        id="watchendtimeHelpBlock"
                        className="form-text text-muted"
                      >
                        This is when your plan should stop watching &amp; send your template to your group.
                      </small>
                    </Col>
                  </Row>
                  <div key={`activatestartend-submit-div-${props.plan.id}`} className="submitBtn">
                    <button
                      key={`activatestartend-submit-${props.plan.id}`}
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
            <Tab key={`setGroups-Tab-${props.plan.id}`} eventKey={`plan3-${props.plan.id}`} title="Set Groups">
              <div key={`setGroups-Tab-div1-${props.plan.id}`} className="mt-2">
                <p key={`setGroups-Tab-p1-${props.plan.id}`} className="small" style={{ lineHeight: "1" }}>
                  Add Groups to your Plan to be sure all the right individuals know it when your plan up a flare.
                </p>
              </div>
            </Tab>
            <Tab
              key={`assigntemplates-tab-${props.plan.id}`}
              eventKey={`plan4-${props.plan.id}`}
              title="Assign Template"
            >
              <div key={`assigntemplates-Tab-div1-${props.plan.id}`} className="mt-2">
                <p key={`assigntmplates-Tab-p1-${props.plan.id}`} className="small" style={{ lineHeight: "1" }}>
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
