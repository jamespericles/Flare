import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Profile extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                <h5 className="container">Update Profile here</h5>
            </div>
        )
    }
}