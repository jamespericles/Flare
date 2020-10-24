import axios from 'axios';
import React, { Component } from 'react';
//import axios from "axios";

/* NEEDED AS A PLACEHOLDER ON A PAGE CALLED TWILIO W/ A ROUTE `/twilio` */
class SMSForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {
                to: '',
                body: ''
            },
            submitting: false,
            error: false
        }
        this.onHandleChange = this.onHandleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }

    onHandleChange(event) {
        const name = event.target.getAttribute('name')
        this.setState({
            message: { ...this.state.message, [name]: event.target.value }
        })
    };

    /* NEW ON SUBMIT WILL BE 
        axios.post('/api/plans/:id/start');
    */

    onSubmit(event) {
        event.preventDefault();
        this.setState({ submitting: true });
        axios.post('/api/plans/1/start',
            JSON.stringify(this.state.message), {
                headers: {
                    'Content-Type': 'application/json'
                }
        }
        )
            .then(data => {
                if (data.success) {
                    this.setState({
                        error: false,
                        submitting: false,
                        message: {
                            to: '',
                            body: ''
                        }
                    });
                } else {
                    this.setState({
                        error: true,
                        submitting: false
                    });
                }
            });
    }



    render() {
        return (
            <form
                onSubmit={this.onSubmit}
                className={this.state.error ? 'error sms-form' : 'sms-form'}
            >
                <div>
                    <label htmlFor="to">To:</label>
                    <input
                        type="tel"
                        name="to"
                        id="to"
                        value={this.state.message.to}
                        onChange={this.onHandleChange}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        name="body"
                        id="body"
                        value={this.state.message.body}
                        onChange={this.onHandleChange} />
                </div>
                <button type="submit" disabled={this.state.submitting}>
                    Send message
        </button>
            </form>
        );
    }
}
export default SMSForm;