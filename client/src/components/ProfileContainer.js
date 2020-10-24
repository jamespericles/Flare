// Container that displays key profile fields and update functions for them
import React, { Component } from "react";
//import { Avatar } from '@material-ui/core';
import Image from 'react-bootstrap/Image';
import { Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetUserFirstName from "./SubComponents/GetUserFirstName";
import GetUserLastName from "./SubComponents/GetUserLastName";
import GetUserEmail from "./SubComponents/GetUserEmail";
import GetUserPhone from "./SubComponents/GetUserPhone";
import GetUserAddress from "./SubComponents/GetUserAddress";

export default class Profile extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container mt-3">
              <h5>Profile Details</h5>
              <Container>
                <Row>
                  <Col xs={6} md={4}>
                    <Image src="holder.js/171x180" roundedCircle />
                  </Col>
                </Row>
              </Container>

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mt-3 ml-3 mr-3">
              <hr />
              <p>
                <GetUserFirstName /> <GetUserLastName /> <br />
                <GetUserEmail /> <br />
                <GetUserPhone /> <br />
                <GetUserAddress /> <br />

              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
