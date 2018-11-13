import React, { Component } from 'react';
import axios from 'axios';

class SingleStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: {},
            isLoaded: false,
            singleValue: ''
        }
        this.handleSingleValue = this.handleSingleValue.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.buildTable = this.buildTable.bind(this);
    }

    handleSingleValue(e) {
        this.setState({
            singleValue: e.target.value 
        })
    }

    handleClick() {
        axios.get(`https://interviewapikloc.herokuapp.com/stores/${this.state.singleValue}.json`)
        .then((response) => {
            // console.log(response.data);
            this.setState({
                store: response.data,
                isLoaded: true
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    buildTable() {
        return (
            <div className="container">
                <div className="col-md mb-2">
                    <table className="table" border="1">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> {this.state.store.name} </td>
                                <td> {this.state.store.location} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="col-md-4">
                <h4>Single Store</h4>
                <form className="form-group">
                    <label> Enter Store Id </label>
                    <input className="form-control" type="text" value={this.state.singleValue} onChange={this.handleSingleValue} />
                    <input className="btn btn-primary" type="button" value="Submit" onClick={this.handleClick} />
                </form>
                <div>
                {
                    this.state.isLoaded ? this.buildTable() : <img alt="" />
                }
                </div>
            </div>
        )
    }
}

export default SingleStore;