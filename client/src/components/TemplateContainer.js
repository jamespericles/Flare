// Placeholder container that displays the ListGroups and AddGroup containers
import React, { Component } from "react";
import ListTemplates from "./ListTemplates";
import AddTemplate from "./AddTemplate";
// import GetUserFirstName from './SubComponents/GetUserFirstName';

export default class Templates extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container mt-3">
              <h5>Templates</h5>
              <p>
                Templates are custom messages assigned to your plans. Your templates can be set to message a single
                contact or even your whole group assigned to a plan
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mt-3 ml-3 mr-3">
              <h5>Add Template</h5>
              <hr />
              <AddTemplate />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mt-3 ml-3 mr-3">
              <h5>My Templates</h5>
              <hr />
              <ListTemplates />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
