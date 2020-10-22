// Container component that displays the plan components including plan creation, group and contact assignment, and template assignment
import React, { Component } from 'react'
import ListPlans from './ListPlans';
import AddPlan from  './AddPlan';
// import GetUserFirstName from './SubComponents/GetUserFirstName';

export default class Plans extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="container mt-3">
                        <h5>Flare Plans</h5>    
                        <p>Plans - they are your communication and alert scenarios. Create them, assign groups and contacts to your plans, assign your templates to your plans, and have your groups and contacts receive your custom templates when your flare goes off.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mt-3 ml-3 mr-3">
                            <h5>Add Plan</h5>
                            <hr />
                            <AddPlan />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mt-3 ml-3 mr-3">
                            <h5>My Plans</h5>
                            <hr />
                            <ListPlans />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}