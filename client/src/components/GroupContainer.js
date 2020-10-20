// Placeholder container that displays the ListGroups and AddGroup containers
import React, { Component } from 'react';
import AddContact from './AddContact';
import AddGroup from  './AddGroup';
import GetUserFirstName from './SubComponents/GetUserFirstName';

export default class Groups extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="container mt-3">
                        <h5>Get Started With Groups</h5>    
                        <p>One of the things we all have, <GetUserFirstName />, is a network. A network is a group of people we can rely on in scary times and times of need. They are people who watch our backs and will always respond to you if you send up a flare.</p>
                        <p>Get started with adding contacts in your network. Organize them by creating groups and adding your contacts to them.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mt-3 ml-3 mr-3">
                            <AddContact />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mt-3 ml-3 mr-3">
                            <AddGroup />
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}