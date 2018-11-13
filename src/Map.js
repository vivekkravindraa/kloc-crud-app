import React, { Component } from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import axios from "axios";
import Geocode from "react-geocode";
const { apiKey } = require('./api_key');

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 12.9716, lng: 77.5946 }}>
      {props.locate.map((marker, index) => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={index}
            onClick={onClick}
            position={{ 
              lat: marker.results[0].geometry.location.lat,
              lng: marker.results[0].geometry.location.lng
            }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.results[0].formatted_address}
                </div>
              </InfoWindow>}
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default class ShelterMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      selectedMarker: false,
      locate: []
    }
  }
  componentDidMount() {
    axios.get("https://interviewapikloc.herokuapp.com/stores.json")
    .then((response) => {
      this.setState({
        shelters: response.data
      })
      let myArray = [];
      this.state.shelters.map((value) => {
        Geocode.setApiKey(apiKey);
        Geocode.enableDebug();
        return Geocode.fromAddress(value.location)
        .then((response) => {
          myArray.push(response);
          this.setState(prevState => ({
            locate: [].concat(myArray)
          }))
        })
        .catch((err) => {
          console.log(err);
        })
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker })
  }
  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        locate={this.state.locate}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9Izj_XTJfrJZoaxy-ePZY37UMZ4AOfU8&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}