import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Plans extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                <h5 className="container">Plans here</h5>
            </div>
        )
    }
}