import React from 'react'
import Link from 'gatsby-link'
import { Timeline } from 'react-twitter-widgets'
import ReactDOM from 'react-dom'
// import { OpenWeatherMap } from 'react-weather';

const Social = () => (
  <div className="box box-Weather">
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'PhiladelphiaGov',
      }}
      options={{
        username: 'PhiladelphiaGov',
        height: '480',
      }}
      onLoad={() => console.log('Timeline is loaded!')}
    />
  </div>
)

export default Social
