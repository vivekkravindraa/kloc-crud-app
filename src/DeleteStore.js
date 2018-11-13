import React, { Component } from 'react';
import axios from 'axios';

class DeleteStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeId: ''
        }
        this.handleStoreId = this.handleStoreId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStoreId(e) {
        this.setState({
            storeId: e.target.value
        })
        // console.log(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();

        axios.delete(`https://interviewapikloc.herokuapp.com/stores/${this.state.storeId}`)
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
                <h4> Delete Store </h4>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label> Enter Store Id </label>
                    <input className="form-control" type="text" value={this.state.storeId} onChange={this.handleStoreId} />
                    <input className="btn btn-danger" type="submit" value="Delete" />
                </form>
            </div>
        )
    }
}

export default DeleteStore;