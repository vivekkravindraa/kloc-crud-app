import React, { Component } from 'react';
import giphy from './giphy.gif'
import axios from 'axios';

class Compose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            isLoaded: false,
            filterStores: [],
            searchValue: '',
            singleValue: '',
            storeName: '',
            storeLocation: '',
            status: 'Click To Add Store',
            storeId: '',
            updateStoreName: '',
            updateStoreLocation: '',
            id: ''
        }
        this.buildTable = this.buildTable.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStoreId = this.handleStoreId.bind(this);
        this.handleStoreName = this.handleStoreName.bind(this);
        this.handleStoreLocation = this.handleStoreLocation.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleId = this.handleId.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        axios.get(`https://interviewapikloc.herokuapp.com/stores.json`)
        .then((response) => {
            // console.log(response.data);
            this.setState({
                stores: response.data,
                isLoaded: true,
                filterStores: response.data
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleSearch(e) {
        e.persist();

        this.setState(prevState => ({
            filterStores: prevState.stores.filter(store => store.name.toLowerCase().indexOf(e.target.value) >= 0), 
            searchValue: e.target.value
        }))
    }

    buildTable() {
        return (
            <div className="container">
                <form className="form-group">
                    <input className="form-control form-control-sm" placeholder="Search By Name.." type="text" value={this.state.searchValue} onChange={this.handleSearch} />
                </form>
                <div className="col-md">
                    <table className="table table-sm table-dark" border="1" >
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.filterStores.map((store, index) => {
                                return <BuildTable item={store} key={index} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
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

        axios.post(`https://interviewapikloc.herokuapp.com/stores`, (
            {
                name: this.state.storeName,
                location: this.state.storeLocation
            }
        ))
        .then((response) => {
            const newStoreData = this.state.stores.concat([response.data])
            this.setState(prevState => ({
                stores: newStoreData,
                filterStores: newStoreData
            }))
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleStoreId(e) {
        this.setState({
            storeId: e.target.value
        })
        // console.log(e.target.value);
    }

    handleStoreName(e) {
        this.setState({
            updateStoreName: e.target.value
        })
        // console.log(e.target.value);
    }

    handleStoreLocation(e) {
        this.setState({
            updateStoreLocation: e.target.value
        })
        // console.log(e.target.value);
    }

    handleUpdate(e) {
        e.preventDefault();

        // let formData = {
        //     name: this.state.storeName,
        //     location: this.state.storeLocation
        // }
        // console.log(formData);

        axios.put(`https://interviewapikloc.herokuapp.com/stores/${this.state.storeId}`, (
            {
                name: this.state.updateStoreName,
                location: this.state.updateStoreLocation
            }
        ))
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleId(e) {
        this.setState({
            id: e.target.value
        })
        // console.log(e.target.value);
    }

    handleDelete(e) {
        e.preventDefault();

        axios.delete(`https://interviewapikloc.herokuapp.com/stores/${this.state.id}`)
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h4> Listing Stores = {this.state.stores.length}</h4>
                        {
                            this.state.isLoaded ? this.buildTable() : <img alt="" src={giphy} />
                        }
                    </div>
                    <div className="col">
                        <div className="col-md">
                            <h6> Add Store </h6>
                            <div class="alert alert-primary" role="alert">
                                <form className="form-group" onSubmit={this.handleSubmit}>
                                    <label> Name </label>
                                    <input className="form-control form-control-sm" type="text" value={this.state.storeName} onChange={this.handleName} />
                                    <label> Location </label>
                                    <input className="form-control form-control-sm" type="text" value={this.state.storeLocation} onChange={this.handleLocation} />
                                    <button className="btn btn-success btn-sm" type="submit">{this.state.status}</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md">
                            <h6> Update Store </h6>
                            <div class="alert alert-warning" role="alert">
                                <form className="form-group" onSubmit={this.handleUpdate}>
                                    <label> Enter Store Id </label>
                                    <input className="form-control form-control-sm" type="text" value={this.state.storeId} onChange={this.handleStoreId} />
                                    <label> Name </label>
                                    <input className="form-control form-control-sm" type="text" value={this.state.updateStoreName} onChange={this.handleStoreName} />
                                    <label> Location </label>
                                    <input className="form-control form-control-sm" type="text" value={this.state.updateStoreLocation} onChange={this.handleStoreLocation} />
                                    <button className="btn btn-primary btn-sm" type="submit">Update</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md">
                            <h6> Delete Store </h6>
                            <div class="alert alert-danger" role="alert">
                                <form className="form-group" onSubmit={this.handleDelete}>
                                    <label> Enter Store Id </label>
                                    <input className="form-control form-control-sm" type="text" value={this.state.id} onChange={this.handleId} />
                                    <button className="btn btn-danger btn-sm" type="submit">Delete</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class BuildTable extends Component {
    render() {
        return (
            <tr>
                <td> {this.props.item.name} </td>
                <td> {this.props.item.location} </td>
            </tr>
        )
    }
}

export default Compose;