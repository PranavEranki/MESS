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

    this.state = {
      data: [],
      isHovering: false,
      class: "",
    }

    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }
  static defaultProps = {
    center: {
      lat: 39.952548,
      lng: -75.142772,
    },
    zoom: 1,
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.loadData(), 5000)
    this.loadData()
  }

  loadData() {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: [...response],
        })
        console.log(this.state.data)
      })
  }

  showModal() {
    this.setState({
      class: "miniModal display",
    })
  }

  hideModal() {
    this.setState({
      class: "miniModal noDisplay",
    })
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
        <div className={this.state.class}>
          {console.log(this.state.class)}
          CHECK IT OUT
        </div>
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
            {this.state.data.map((report, i) => {
              return (
                <Marker
                  title="test"
                  name={'SOMA'}
                  position={{ lat: report.lat, lng: report.lng }}
                  onMouseover={this.showModal}
                  onMouseout={this.hideModal}
                />
              )
            })}
          </Map>
        </div>
      </div>
    )
  }
}

// <AnyReactComponent
//   lat={this.state.data.lat}
//   lng={this.state.data.lng}
//   text={this.state.data.location}
// />

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBBQV4sjwVyvKN1mOHjAOmlfuLUR4CIzMg',
})(MapContainer)
