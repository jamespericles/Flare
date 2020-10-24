// Component form and axios storecontact component for adding a new plan
import axios from 'axios';
import React, { useState } from 'react';
import { SAVE_PLAN } from '../../store/actions';
import { useStoreContext } from '../../store/store';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import './style.css';

const AddPlan = () => {
    const [state, dispatch] = useStoreContext();

    const [newPlan, setNewPlan] = useState({
        planname: '',
        isActive: false,
        isHome: false,
        durationBeforeExecution: '',
        activatestart: 0,
        activateend: 0,
        executeplan: 0,
        UserId: state.user.id,
        contacts: '',
        groups: '',
        days: 0,
        hours: 0,
        minutes: 0,
        durationCalculated: 0 
    });

    // const [activeToggle, setActiveToggle] = useState(false);
    // const [homeToggle, setHomeToggle] = useState(false)

    console.log(state.user.id);

    // Handles updating the new contact whenever a change event or keytroke occurs.
    const handleChange = (event) => {
        // Sets a generic name and value so that newContact updates whenever any field is updated, and updates the field being with the current value of that field.
        const { name, value } = event.target;
        setNewPlan({ ...newPlan, [name]: value });
        console.log("newPlan",newPlan);
        let today = new Date();
        console.log("today", today);
        if(event.target.name === "activatestart" || event.target.name === "activateend") {
            let converted = new Date(event.target.value)
            setNewPlan({...newPlan, [name]: converted})
        }
        if (newPlan.activatestart !== 0 && newPlan.activateend !== 0 && newPlan.durationCalculated === 0) {
            // Conversion of the difference between the 2 dates (result in miliseconds) to minutes 
            let duration = (newPlan.activateend - newPlan.activatestart)/60000;
            setNewPlan({...newPlan, durationBeforeExecution: duration});
        }
        if (event.target.name === "activatestart") {
            let converted = new Date(event.target.value)
            if (event.target.value !== undefined && event.target.value < today) {
                event.target.value = today;
                setNewPlan({...newPlan, [name]: converted})
            } 
        }
        if (event.target.name === "minutes") {
            let convertedmin = event.target.value*60000;
            let convertedhrs = newPlan.hours*3600000;
            let converteddys = newPlan.days*86400000;
            let calcDuration = convertedmin + convertedhrs + converteddys;
            setNewPlan({...newPlan, durationCalculated: calcDuration})
        }
        if (event.target.name === "hours") {
            let convertedmin = newPlan.minutes*60000;
            let convertedhrs = event.target.value*3600000;
            let converteddys = newPlan.days*86400000;
            let calcDuration = convertedmin + convertedhrs + converteddys;
            setNewPlan({...newPlan, durationCalculated: calcDuration})
        }
        if (event.target.name === "days") {
            let convertedmin = newPlan.minutes*60000;
            let convertedhrs = newPlan.hours*3600000;
            let converteddys = event.target.value*86400000;
            let calcDuration = convertedmin + convertedhrs + converteddys;
            let durationInMin = calcDuration/60000;
            setNewPlan({...newPlan, durationCalculated: calcDuration, durationBeforeExecution: durationInMin});
        }
    }
    
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

    // const getnow = (() => {return new Date.now();});

    const handleSubmit = (event) => {
        // Prevents page refresh thereby losing info
        event.preventDefault();
        console.log('executionDelay:', (newPlan.activateend-newPlan.activatestart));
        axios
            .post(`/api/plans/add/${state.user.id}`, {
                planname: newPlan.planname,
                UserId: state.user.id,
                activatestart: newPlan.activatestart,
                activateend: newPlan.activateend,
                durationBeforeExecution: 1000 * 15,
                // newPlan.durationBeforeExecution,
                executeplan: false 
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: SAVE_PLAN, plan: response.data.plan})
                    console.log("submitted plan:", newPlan )
                };
            })
            .catch((error) => {
                console.log({message: error.message});
                console.log(error);
            });

        setNewPlan({
            planname: '',
            isActive: false,
            isHome: false,
            durationBeforeExecution: '',
            activatestart: 0,
            activateend: 0,
            executeplan: 0,
            UserId: state.user.id,
            contacts: '',
            groups: '',
            days: 0,
            hours: 0,
            minutes: 0,
            durationCalculated: 0 
        });
    }
    
    

    return (    
        <div className = 'control-pane'>
            <div className='control-section'>
                <div className='validation_wrapper'>
                    <div className="control_wrapper" id="control_wrapper">
                        <Form id="addPlan"  method="post">
                            <Row>
                                <Col>
                                    <Form.Control 
                                        placeholder="Plan Name"
                                        type="text"
                                        id="planname"
                                        name="planname"
                                        onChange={handleChange}
                                        aria-describedby="plannameHelpBlock"
                                    />
                                    <small id="plannameHelpBlock" className="form-text text-muted">
                                        Your plan name should be a scenario that you quickly and easily recognize like "sketchy place" or "walking home alone"
                                    </small>
                                </Col>
                            </Row>
                            
                            
                            <small className="ml-3 mr-3 text-muted">Assign a default time limit for your plan. Once you kick it off and after the time you specify below, your plan will alert your group of contacts will the template you've specified...</small>
                           <Row>
                               <Col>
                               <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label><small>Days</small></Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="days"
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    >
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                        <option>25</option>
                                        <option>26</option>
                                        <option>27</option>
                                        <option>28</option>
                                        <option>29</option>
                                        <option>30</option>
                                    </Form.Control>
                                </Form.Group>
                               </Col>
                               <Col>
                               <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label><small>Hours</small></Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="hours"
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    >
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>4</option>
                                        <option>6</option>
                                        <option>8</option>
                                        <option>10</option>
                                        <option>13</option>
                                        <option>16</option>
                                        <option>19</option>
                                        <option>21</option>
                                    </Form.Control>
                                </Form.Group>
                               </Col>
                               <Col>
                               <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label><small>Minutes</small></Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="minutes"
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    >
                                        <option>0</option>
                                        <option>5</option>
                                        <option>10</option>
                                        <option>15</option>
                                        <option>30</option>
                                        <option>45</option>
                                        <option>55</option>
                                    </Form.Control>
                                </Form.Group>
                               </Col>
                           </Row>
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
                        <div id="confirmationDialog"/> </div>
                    </div>
                </div>
        </div>
    ) 
}

export default AddPlan;