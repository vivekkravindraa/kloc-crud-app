import React, { Component } from 'react';
import axios from 'axios';

class AddStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeName: '',
            storeLocation: '',
            status: 'Click To Submit'
        }
        this.handleName = this.handleName.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(e) {
        this.setState({
            storeName: e.target.value
        })
        // console.log(e.target.value);
    }

    handleLocation(e) {
        this.setState({
            storeLocation: e.target.value
        })
        // console.log(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();

        // let formData = {
        //     name: this.state.storeName,
        //     location: this.state.storeLocation
        // }
        // console.log(formData);

        axios.post(`https://interviewapikloc.herokuapp.com/stores`, ({name: this.state.storeName,
        location: this.state.storeLocation}))
        .then((response) => {
            this.setState({
                status: 'Successfully Submitted'
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="col-md-4">
                <h4> Add Store </h4>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label> Name </label>
                    <input className="form-control" type="text" value={this.state.storeName} onChange={this.handleName} />
                    <label> Location </label>
                    <input className="form-control" type="text" value={this.state.storeLocation} onChange={this.handleLocation} />
                    <input className="btn btn-primary" type="submit" value="Add Store" />
                    <div className="alert alert-primary" role="alert">
                        {this.state.status}
                    </div>
                </form>
            </div>
        )
    }
}

export default AddStore;