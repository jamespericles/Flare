// Component that maps through the plans in the db associated with the user and renders them
import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../../store/store';
import { SET_PLANS } from '../../store/actions';
import PlanItem from "../PlanItem";
// import { IconContext } from "react-icons";
// import { MdRemoveCircle } from 'react-icons/md';
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Nav from 'react-bootstrap/Nav';
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import axios from 'axios';

const ListPlans = () => {
    const [state, dispatch] = useStoreContext();
    const [currPlans, setCurrPlans] = useState([state.plans])
    // const [selectedPlan, setSelectedPlan] = useState({
    //     id: '',
    //     planname: '',
    //     isActive: '',
    //     isHome: '',
    //     durationBeforeExecution: '',
    //     activatestart: 0,
    //     activateend: 0,
    //     executeplan: 0,
    //     UserId: state.user.id,
    //     contacts: '',
    //     groups: '',
    //     days: 0,
    //     hours: 0,
    //     minutes: 0,
    //     durationCalculated: 0 
    // });

    useEffect(() => {
        loadPlans()
    },[]);


    function loadPlans() {
        axios
            .get(`/api/plans/getallbyuser/${state.user.id}`)
            .then((response) => {
            if (response.status === 200) {
                console.log(response.data.plans);
                setCurrPlans(response.data.plans);
                dispatch({type: SET_PLANS, plans: response.data.plans});
            }
            })
            .catch((error) => {
            console.log({message: error.message});
            console.log(error);
        });  
    };
    
    
       
    return (    
        <div>
            <div className="planitem">
                <ul>
                    {state.plans !== null && state.plans.length > 0  ? (state.plans.map((plan, i) => {
                            return(    
                                <PlanItem plan={plan} />
                            );})) : (<p className="small">Let's prep your flares. <Link to="/plans">Create a plan now!</Link></p>)
                    }                
                </ul>
            </div>
        </div>
    );
}

export default ListPlans;