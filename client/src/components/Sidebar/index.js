// Component to handle top menu bar and sidedrawer navigation
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import React, { Component } from 'react';
import Logout from '../logout';
import { Link } from "react-router-dom";
import "./style.css";
import { IconContext } from "react-icons";
import { MdDashboard } from 'react-icons/md';
import { MdGroup } from 'react-icons/md';
import { MdContactMail } from 'react-icons/md';
import { MdDevicesOther } from 'react-icons/md';
import { MdAccountCircle } from 'react-icons/md';
import GetUserFirstName from '../SubComponents/GetUserFirstName';

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
                    <div className="header">Welcome, <GetUserFirstName />! &nbsp; &nbsp; &nbsp; Ready to send up a <em>Flare</em>?</div>
                </div> 
                <SidebarComponent 
                        id="sidebar-menu" 
                        ref={Sidebar => this.sidebarObj = Sidebar} 
                        type="Over" 
                        showBackdrop="true" 
                        position="Left" 
                        width="250px"
                    >
                        <div id="close" className="e-icons" onClick={this.closeClick}></div>
                        <div className="content-area">                               
                            <ul>
                            <li>
                                <Logout />
                            </li>
                            <li>
                                <Link to="/" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                                    <span>
                                    <IconContext.Provider value={{ size: "1em", style: { verticalAlign: 'text-top', color: "default" }  }}>
                                        <MdDashboard /> 
                                    </IconContext.Provider> Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/groups" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                                    <span>
                                    <IconContext.Provider value={{ size: "1em", style: { verticalAlign: 'text-top', color: "default" }  }}>
                                        <MdGroup /> 
                                    </IconContext.Provider> Groups</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/templates" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                                    <span>
                                    <IconContext.Provider value={{ size: "1em", style: { verticalAlign: 'text-top', color: "default" }  }}>
                                        <MdContactMail /> 
                                    </IconContext.Provider> Templates</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Plans" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                                    <span>
                                    <IconContext.Provider value={{ size: "1em", style: { verticalAlign: 'text-top', color: "default" }  }}>
                                        <MdDevicesOther /> 
                                    </IconContext.Provider> Plans</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Profile" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                                    <span>
                                    <IconContext.Provider value={{ size: "1em", style: { verticalAlign: 'text-top', color: "default" }  }}>
                                        <MdAccountCircle /> 
                                    </IconContext.Provider> Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/twilio" className="btn btn-link sidebarLinks" onClick={this.closeClick}>
                                    <span>
                                    <IconContext.Provider value={{ size: "1em", style: { verticalAlign: 'text-top', color: "default" }  }}>
                                        <MdAccountCircle /> 
                                    </IconContext.Provider> Twilio</span>
                                </Link>
                            </li>
                            </ul>
                        </div>

                    </SidebarComponent>  
            </>
           );
    }
}