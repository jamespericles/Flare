// Component to handle top menu bar and sidedrawer navigation
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import React, { Component } from "react";
import Logout from "../SubComponents/logout";
import { Link } from "react-router-dom";
import "./style.css";
import { IconContext } from "react-icons";
import { MdDashboard } from "react-icons/md";
import { MdGroup } from "react-icons/md";
import { MdPersonAdd } from "react-icons/md";
import { MdContactMail } from "react-icons/md";
import { MdDevicesOther } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import FlareLogo5 from "../../assets/flareLogo5.png";
import FlareLogo7 from "../../assets/flareLogo7.png";
// import FlareLogo6 from "../../assets/flareLogo6.png";
import GetUserFirstName from "../SubComponents/GetUserFirstName";

import { enableRipple } from "@syncfusion/ej2-base";
enableRipple(true);

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.closeClick = this.closeClick.bind(this);
    this.openClick = this.openClick.bind(this);
  }

  // Open the Sidebar
  openClick() {
    this.sidebarObj.show();
  }
  // Close the Sidebar
  closeClick() {
    this.sidebarObj.hide();
  }
  render() {
    return (
      <>
        <div id="head">
          <div className="text">Menu</div>
          <span id="hamburger" className="e-icons menu" onClick={this.openClick}></span>
          <div className="header">
            {/* <div className="row"> */}
            {/* <div className="col-8 col-md-8 col-sm-4 col-xs-4" style={{ textAlign: "right" }}> */}
            <span className="mr-3 pr-2">
              Ready to send up a <em>Flare</em>?
            </span>
            <img src={FlareLogo5} height="30px" style={{ padding: "3px 0 5px 0" }} />
            &nbsp;
            <img src={FlareLogo7} height="50px" style={{ padding: "10px 0 8px 0" }} />
            {/* </div> */}
            {/* <div className="col-4 col-md-4 col-sm-8 col-xs-8 pr-2" style={{ margin: "auto auto", textAlign: "right" }}> */}
            <Link className="profileLink" to="/profile" style={{ float: "right" }}>
              <IconContext.Provider value={{ size: "1.5em", style: { color: "default" } }}>
                <MdAccountCircle />
              </IconContext.Provider>
              &nbsp; Welcome back, <GetUserFirstName />
              !&nbsp; &nbsp;
            </Link>
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
        <SidebarComponent
          id="sidebar-menu"
          ref={Sidebar => (this.sidebarObj = Sidebar)}
          type="Over"
          showBackdrop="true"
          position="Left"
          width="250px"
        >
          <div id="close" className="e-icons" onClick={this.closeClick}></div>
          <div className="content-area">
            <ul>
              <li>
                <img src={FlareLogo7} width="100px" style={{ textAlign: "center", paddingLeft: "10px" }} />
              </li>
              <li>
                <Logout />
              </li>
              <li>
                <Link to="/" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                  <span>
                    <IconContext.Provider
                      value={{ size: "1em", style: { verticalAlign: "text-top", color: "default" } }}
                    >
                      <MdDashboard />
                    </IconContext.Provider>{" "}
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/groups" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                  <span>
                    <IconContext.Provider
                      value={{ size: "1em", style: { verticalAlign: "text-top", color: "default" } }}
                    >
                      <MdGroup />
                    </IconContext.Provider>{" "}
                    Groups
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                  <span>
                    <IconContext.Provider
                      value={{ size: "1em", style: { verticalAlign: "text-top", color: "default" } }}
                    >
                      <MdPersonAdd />
                    </IconContext.Provider>{" "}
                    Contacts
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/templates" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                  <span>
                    <IconContext.Provider
                      value={{ size: "1em", style: { verticalAlign: "text-top", color: "default" } }}
                    >
                      <MdContactMail />
                    </IconContext.Provider>{" "}
                    Templates
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/Plans" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                  <span>
                    <IconContext.Provider
                      value={{ size: "1em", style: { verticalAlign: "text-top", color: "default" } }}
                    >
                      <MdDevicesOther />
                    </IconContext.Provider>{" "}
                    Plans
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/Profile" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                  <span>
                    <IconContext.Provider
                      value={{ size: "1em", style: { verticalAlign: "text-top", color: "default" } }}
                    >
                      <MdAccountCircle />
                    </IconContext.Provider>{" "}
                    Profile
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/twilio" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                  <span>
                    <IconContext.Provider
                      value={{ size: "1em", style: { verticalAlign: "text-top", color: "default" } }}
                    >
                      <MdAccountCircle />
                    </IconContext.Provider>{" "}
                    Twilio Test
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </SidebarComponent>
      </>
    );
  }
}
