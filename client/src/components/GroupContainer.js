// Placeholder container that displays the ListGroups and AddGroup containers
import React, { Component } from 'react';
// import AddContact from './AddContact';
import AddGroup from  './AddGroup';
import ListGroups from './ListGroups';
import GetUserFirstName from './SubComponents/GetUserFirstName';

export default class Groups extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="container mt-3">
                        <h5>Get Started With Groups</h5>    
                        <p><GetUserFirstName />, your groups are what you'll make your flare plans around. Once you create a group you'll be able to assign your contacts to them.</p>
                        <p>Get started by creating a group below.  Then navigate to <strong>Contacts</strong>, to add new contacts. Organize them by creating groups and adding your contacts to them.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mt-3 ml-3 mr-3">
                            <h5>Add Group</h5>
                            <hr />
                            <AddGroup />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mt-3 ml-3 mr-3">
                            <h5>My Groups</h5>
                            <hr />
                            <ListGroups />
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}