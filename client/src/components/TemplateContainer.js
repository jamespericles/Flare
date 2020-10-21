// Placeholder container that displays the ListGroups and AddGroup containers
import React, { Component } from 'react';
import ListTemplates from './ListTemplates';
import AddTemplate from  './AddTemplate';
import GetUserFirstName from './SubComponents/GetUserFirstName';

export default class Templates extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="container mt-3">
                        <h5>Add a Template</h5>    
                        <p><GetUserFirstName />, templates are custom messages assigend to your plans.</p>
                        <p>Get started by adding your first template</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mt-3 ml-3 mr-3">
                            <AddTemplate />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mt-3 ml-3 mr-3">
                            {/* <ListTemplates /> */}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}