import React, { Component } from 'react';
import Store from './Store';
import SingleStore from './SingleStore';
import AddStore from './AddStore';
import UpdateStore from './UpdateStore';
import DeleteStore from './DeleteStore';
import ShelterMap from './Map';
// import Compose from './Compose';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Store />
        <SingleStore />
        <AddStore />
        <UpdateStore />
        <DeleteStore />
        <ShelterMap />
        {/* <Compose /> */}
      </div>
    );
  }
}

export default App;
