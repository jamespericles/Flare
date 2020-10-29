// Container component that displays the plan components including plan creation, group and contact assignment, and template assignment
import React, { Component } from "react";
import ListContacts from "./ListContacts";
import AddContact from "./AddContact";
import { Link } from "react-router-dom";
import GetUserFirstName from "./SubComponents/GetUserFirstName";

export default class Contacts extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container mt-3">
              <h5>Build Your Contacts</h5>
              <p>
                One of the things we all have, <GetUserFirstName />, is a network. A network is a group of people we can
                rely on in scary times and times of need. They are people who watch our backs and will always respond to
                you if you send up a flare.
              </p>
              <p>
                Get started with adding contacts in your network. Organize them by groups.{" "}
                <span className="small">
                  (Don't have any Groups created yet? <Link to="/groups">Create a Group now!</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mt-3 ml-3 mr-3 mb-5">
              <h5>Add Contact</h5>
              <hr />
              <AddContact />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mt-3 ml-3 mr-3">
              <h5>My Contacts</h5>
              <hr />
              <ListContacts />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
