import React from 'react'
import Link from 'gatsby-link'

import Tabs from '../components/data-tabs'
import Map from '../components/map'
import Social from '../components/social'
import Reports from '../components/reports'
// import Weather from '../components/weather'

const Home = () => (
  <div>
    <Tabs />
    <Reports />
    <Map />
    <br />
    <br />
    <br />
    <br />
    <div className="columns">
      <div className="column">
        <Social />
      </div>
      {/* <div className="column">
        <Weather />
      </div> */}
    </div>
  </div>
)

export default Home
