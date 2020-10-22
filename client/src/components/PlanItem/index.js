// Component that maps through the templates in the db associated with the user and renders them
import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../../store/store';
import { SAVE_PLAN } from '../../store/actions';

import { IconContext } from "react-icons";
import { MdRemoveCircle } from 'react-icons/md';
// import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const PlanItem = (props) => {
    const [state, dispatch] = useStoreContext();
    const [selectedPlan, setSelectedPlan] = useState({
        id: props.plan.id,
        planname: props.plan.planname,
        isActive: props.plan.isActive,
        isHome: props.plan.isHome,
        durationBeforeExecution: props.plan.durationBeforeExecution,
        activatestart: props.plan.activatestart,
        activateend: props.plan.activatestart,
        executeplan: props.plan.executeplan,
        UserId: state.user.id,
        contacts: props.plan.contacts,
        groups: props.plan.groups, 
    });

    useEffect(() => {
        // What should go in here...
    },[
        // selectedPlan
    ]);

    // const handleActiveToggle = () => {
    //     if(activeToggle === false) {
    //         setActiveToggle(true);
    //         setNewPlan({...newPlan, isActive: true});
    //         console.log("newPlan",newPlan);
    //     } else {
    //         setActiveToggle(false)
    //         setNewPlan({ ...newPlan, isActive: false});
    //         console.log("newPlan",newPlan);
    //     }
    // }
    
    // const handleHomeToggle = () => {
    //     if(homeToggle === false) {
    //         setHomeToggle(true);
    //         setNewPlan({...newPlan, isHome: true});
    //         console.log("newPlan",newPlan);
    //     } else {
    //         setHomeToggle(false)
    //         setNewPlan({ ...newPlan, isHome: true});
    //         console.log("newPlan",newPlan);
    //     }
    // }

    const deletePlan = ((uid,pid) => {
        axios
            .delete(`/api/plans/delete/${uid}/${pid}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Successfully deleted.");
                    loadPlans();
                }
            })
            .catch((error) => {
            console.log({message: error.message});
            console.log(error);
        });
    });

    const handleChange = (event) => {        
        const { name, value } = event.target;
        setSelectedPlan({ ...selectedPlan, [name]: value });
    }

    // function run on submit of the 
    const handleSubmit = (event) => {
        // Prevents page refresh thereby losing info
        dispatch({SAVE_PLAN, plan: event.target.plan});      
        event.preventDefault();
            axios
                .put(`/api/plans/update/${state.user.id}/${state.plan.id}`, {
                    id: selectedPlan.id,
                    planname: selectedPlan.planname,
                    isActive: selectedPlan.isActive,
                    isHome: selectedPlan.isHome,
                    durationBeforeExecution: selectedPlan.durationBeforeExecution,
                    activatestart: selectedPlan.activatestart,
                    activateend: selectedPlan.activateend,
                    executeplan: selectedPlan.executeplan,
                    UserId: state.user.id,
                    contacts: selectedPlan.contacts,
                    groups: selectedPlan.groups,
                })
                .then((response) => {
                    if (response.status === 200) {
                        return response.data.plan;
                    };
                })
                .catch((error) => {
                    console.log({message: error.message});
                    console.log(error);
                })


    // function to set the minimum selectable date to no earlier than today.
    const getnow = (() => {return new Date.now();});

    return (
        <>
            <Card planid={props.plan.id} className="mb-1" key={`plan-${props.plan.id}`}>
                <div className="row">
                    <div className="col-10">&nbsp;<small><strong>{plan.planname}</strong></small></div>
                    <div className="col-1 pr-1">
                        <Button
                            variant="none"
                            size="sm" 
                            style={{textAlign: "right", marginBottom: "0", paddingBottom: "0"}}
                            onClick={() => deletePlan(state.user.id,props.plan.id)}
                            >
                            <IconContext.Provider value={{ size: "1em", style: { verticalAlign: 'text-top', color: "red", textAlign: "right" }  }}>
                                <MdRemoveCircle /> 
                            </IconContext.Provider>
                        </Button>
                    </div>
                </div>
                <Card.Body style={{ marginTop: "0", paddingTop: "0"}}>
                    <Tabs className="tabnav" variant="pills" defaultActiveKey={`plan1-${plan.id}`}>
                        <Tab eventKey={`plan1-${plan.id}`} title="Activate">
                            <div className="mt-2">
                                <p className="small" style={{ lineHeight: "1"}}>
                                    Once your <strong><em>{plan.planname}</em></strong> Flare plan is ready to turn on, you can activate it below.
                                </p>
                                <Row className="mt-4">
                                    <Col>
                                        <Form.Check 
                                            type="switch"
                                            id="isActive"
                                            name="isActive"
                                            onClick={handleActiveToggle}
                                            label="Activate this plan when you create it?"
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check 
                                            type="switch"
                                            id="ishome"
                                            name="ishome"
                                            onClick={handleHomeToggle}
                                            label="Should this plan kick off when you leave home?"
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Tab>
                        <Tab eventKey={`plan2-${plan.id}`} title="Schedule">
                            <div className="mt-2">
                                <p className="small" style={{ lineHeight: "1"}}>
                                    Ready to schedule your plan? Set the activation start date/time and the plan's watch duration below.
                                </p>
                                <Form id="addPlan"  method="post">
                                    <Row className="mt-4 mb-4">
                                        <Col>
                                            <DateTimePickerComponent
                                                id="activatestart"
                                                name="activatestart"
                                                strictMode="true"
                                                key="dateTimePicker-1"
                                                planid={plan.id}
                                                planname={plan.planname}
                                                step="15"
                                                min={getnow}
                                                placeholder="Select Start Date &amp; Time."
                                                onChange={handleChange}
                                                onBlur={handleChange}
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
                                                planid={plan.id}
                                                planname={plan.planname}
                                                placeholder="Select End Date &amp; Time."
                                                onChange={handleChange}
                                                onBlur={handleChange}
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
                                            planid={plan.id} 
                                            style={{ backgroundColor: "#E8C547" }}
                                            onClick={handleSubmit}
                                        >
                                            Update Plan
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey={`plan3-${plan.id}`} title="Set Groups">
                            <div className="mt-2">
                                <p className="small" style={{ lineHeight: "1"}}>Add Groups to your Plan to be sure all the right individuals know it when your plan up a flare.</p>
                            </div>
                        </Tab>
                        <Tab eventKey={`plan4-${plan.id}`} title="Assign Template">
                            <div className="mt-2">
                                <p className="small" style={{ lineHeight: "1"}}>Assign a customized template to your plan that your group contacts will receive if your plan ignites a flare.</p>
                            </div>
                        </Tab>
                    </Tabs>
                </Card.Body>        
            </Card>
        </>                                      
    );
}


export default PlanItem;