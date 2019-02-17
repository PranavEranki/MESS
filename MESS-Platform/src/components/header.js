import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  <div>
    <nav className="navbar is-white">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item brand-text" href="../">
            <b>MESS Dashboard</b>
          </a>
          <div className="navbar-burger burger" data-target="navMenu">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Map
            </a>
            <a className="navbar-item" href="/incidents">
              Incidents
            </a>
            <a className="navbar-item" href="/evacuation">
              Evacuation
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
)

export default Header
