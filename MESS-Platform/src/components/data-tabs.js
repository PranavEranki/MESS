import React, { Component } from 'react'
import Link from 'gatsby-link'

class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reports: 0,
      data: [],
      pending: 0,
      active: 5,
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.loadData(), 4000)
    this.loadData()
  }

  loadData() {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: [...response],
          reports: response.length,
        })
      })
  }

  render() {
    var pending
    if (this.state.reports > 2) {
      pending = 2
    } else {
      pending = 0
    }

    var active
    if (this.state.reports > 2) {
      active = this.state.reports - this.state.pending
    } else {
      active = 0
    }
    return (
      <div>
        <section className="hero is-danger welcome is-small">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Welcome, Philadelphia City Council</h1>
              <h2 className="subtitle">
                Here is a 360 degree view of the latest incidents in your area.
              </h2>
            </div>
            <br />
          </div>
        </section>
        <i className="fas fa-file" />

        <br />
        <section className="info-tiles mw8 center ">
          <div className="tile is-ancestor has-text-centered">
            <div className="tile is-parent">
              <article className="tile is-child box">
                <p className="title">{this.state.reports}</p>
                <p className="subtitle">Total Reports</p>
              </article>
            </div>
            {/* <div className="tile is-parent">
              <article className="tile is-child box">
                <p className="title">59k</p>
                <p className="subtitle">Victims Affected</p>
              </article>
            </div> */}
            <div className="tile is-parent">
              <article className="tile is-child box">
                <p className="title">{pending}</p>
                <p className="subtitle">Pending Operations</p>
              </article>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child box">
                <p className="title">{active}</p>
                <p className="subtitle">Active Operations</p>
              </article>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Tabs
