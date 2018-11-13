import React, { Component } from 'react';
import axios from 'axios';

class UpdateStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeId: '',
            storeName: '',
            storeLocation: ''
        }
        this.handleStoreId = this.handleStoreId.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStoreId(e) {
        this.setState({
            storeId: e.target.value
        })
        // console.log(e.target.value);
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

        axios.put(`https://interviewapikloc.herokuapp.com/stores/${this.state.storeId}`, (
            {
                name: this.state.storeName,
                location: this.state.storeLocation
            }
        ))
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="col-md-4">
                <h4> Update Store </h4>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label> Enter Store Id </label>
                    <input className="form-control" type="text" value={this.state.storeId} onChange={this.handleStoreId} />
                    <label> Name </label>
                    <input className="form-control" type="text" value={this.state.storeName} onChange={this.handleName} />
                    <label> Location </label>
                    <input className="form-control" type="text" value={this.state.storeLocation} onChange={this.handleLocation} />
                    <input className="btn btn-primary" type="submit" value="Update" />
                </form>
            </div>
        )
    }
}

export default UpdateStore;