import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
// <div className={this.state.isHovering ? "miniModal noDisplay" : "miniModal"}>

const AnyReactComponent = ({ text }) => (
  <div className="absPos">
    <div className="miniModal">{text}</div>
    <div className="mapPointer" />
  </div>
)

export class MapContainer extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    center: {
      lat: 39.952548,
      lng: -75.142772,
    },
    zoom: 1,
  }

  render() {
    return (
      <div>
        <br />
        <div
          className="card padding"
          style={{
            height: '500px',
            width: '80%',
            margin: 'auto',
          }}
        >
          <Map
            google={this.props.google}
            bootstrapURLKeys={{
              key: 'AIzaSyBBQV4sjwVyvKN1mOHjAOmlfuLUR4CIzMg',
            }}
            initialCenter={{
              lat: 39.952548,
              lng: -75.142772,
            }}
            zoom={11}
          >
              <Marker
                title='Roxborough High School'
                name={'SOMA'}
                position={{ lat: 40.037331, lng: -75.223068 }}
              />
              <Marker
                title='Abraham Lincoln High School'
                name={'SOMA'}
                position={{ lat: 40.582390, lng: -73.968620 }}
              />
              <Marker
                title='Bartram High School'
                name={'SOMA'}
                position={{ lat: 39.921986, lng: -75.233704 }}
              />
              <Marker
                title='Showalter Science and Discovery'
                name={'SOMA'}
                position={{ lat: 39.849797, lng: -75.405519 }}
              />
              <Marker
                title='Downingtown East High School'
                name={'SOMA'}
                position={{ lat: 40.041580, lng: -75.660255 }}
              />
              <Marker
                title='Avon Grove High School'
                name={'SOMA'}
                position={{ lat: 39.815845, lng: -75.815910 }}
              />
              <Marker
                title='East Norriton Middle School'
                name={'SOMA'}
                position={{ lat: 40.153526, lng: -75.320953 }}
              />
              <Marker
                title='Pottstown Senior High School'
                name={'SOMA'}
                position={{ lat: 40.253426, lng: -75.634727 }}
              />
              <Marker
                title='Cheltenham High School'
                name={'SOMA'}
                position={{ lat: 40.087200, lng: -75.160774 }}
              />
          </Map>
        </div>
      </div>
    )
  }
}

/*
{"name":"Roxborough High School", "latitude":"40.037331", "longitude": "-75.223068"},
{"name":"Abraham Lincoln High School", "latitude":"40.582390", "longitude":"-73.968620"},
{"name":"Bartram High School (Pet Friendly)", "latitude": "39.921986", "longitude": "-75.233704"},
{"name":"Showalter Science and Discovery", "latitude":"39.849797", "longitude":"-75.405519"},
{"name":"Downingtown East High School (Pet-friendly)", "latitude": "40.041580", "longitude": "-75.660255"},
{"name": "Avon Grove High School", "latitude": "39.815845", "longitude": "-75.815910"},
{"name": "East Norriton Middle School", "latitude": "40.153526", "longitude": "-75.320953"},
{"name":"Pottstown Senior High School (Pet Friendly)", "latitude": "40.253426", "longitude": "-75.634727"},
{"name":"Cheltenham High School (Pet-friendly)", "latitude":"40.087200","longitude":"-75.160774"}

*/

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBBQV4sjwVyvKN1mOHjAOmlfuLUR4CIzMg',
})(MapContainer)
