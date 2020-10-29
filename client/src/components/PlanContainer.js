// Container component that displays the plan components including plan creation, group and contact assignment, and template assignment
import React, { Component } from "react";
import ListPlans from "./ListPlans";
import AddPlan from "./AddPlan";
import Alert from "react-bootstrap/Alert";
// import GetUserFirstName from './SubComponents/GetUserFirstName';

export default class Plans extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container mt-3">
              <h5>Flare Plans</h5>
              <p>
                Create a plan, assign groups and contacts to your plans, assign your templates to your plans, and have
                your groups and contacts receive your custom templates when/if your flare goes off.
              </p>
              <Alert variant="warning">
                Have you already created a Template/Group/Contact?
                <br />
                <span className="small">
                  Before you create your plan, be sure to create at least one Template, at least one Group, and at least
                  one Contact assigned to that Group.
                </span>
              </Alert>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-8">
            <div className="mt-3 ml-3 mr-3">
              <h5>Add Plan</h5>
              <hr />
              <AddPlan />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mt-3 ml-3 mr-3">
              <h5>My Plans</h5>
              <hr />
              <ListPlans />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
