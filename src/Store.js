import React, { Component } from 'react';
import giphy from './giphy.gif'
import axios from 'axios';

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            isLoaded: false,
            filterStores: [],
            searchValue: ''
        }
        this.buildTable = this.buildTable.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
                    <input className="form-control" placeholder="Search By Name.." type="text" value={this.state.searchValue} onChange={this.handleSearch} />
                </form>
                <div className="col-md">
                    <table className="table" border="1" >
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

    render() {
        return (
            <div className="col-md">
                <h4> Listing Stores = {this.state.stores.length}</h4>
                {
                    this.state.isLoaded ? this.buildTable() : <img alt="" src={giphy} />
                }
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

export default Store;