import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Templates extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                <h5 className="container">Templates here</h5>
            </div>
        )
    }
}