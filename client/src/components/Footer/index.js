// Footer component for the full-width page foot
import React, { Component } from 'react'
import './style.css'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer text-center fixed-bottom">
                <p className="container" style={{ fontSize: "80%", color: "#E8C547"}}>&copy; 2020, The Flare Project &nbsp;&nbsp; </p>
            </div>
        )
    }
}