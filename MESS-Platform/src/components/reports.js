import React, { Component } from 'react'
import Link from 'gatsby-link'

class Reports extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      show: false,
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
        })
        console.log(this.state.data)
      })
  }

  hideModal = () => {
    this.setState({ show: false })
  }

  showModal = number => {
    this.setState({ show: true, number: number })
  }

  messageChange = e => {
    var value = e.target.value
    this.setState({ message: value })
  }

  sendSMS = () => {
    fetch('http://localhost:5000/send', {
      method: 'POST',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify({
        recipient: this.state.number,
        message: this.state.message,
      }),
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
      })
    alert('Sent')
  }

  render() {
    var modal
    if (this.state.show) {
      modal = (
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-content card pa3 center ">
            <input
              className="input"
              onChange={this.messageChange}
              placeholder="Your Message"
            />{' '}
            <br />
            <br />
            <button className="button" onClick={this.sendSMS}>
              Send SMS
            </button>
          </div>
          <button
            className="modal-close is-large"
            onClick={this.hideModal}
            aria-label="close"
          />
        </div>
      )
    } else {
      modal = (
        <div className="modal ">
          <div className="modal-background" />
          <div className="modal-content card pa3 center ">
            <input
              className="input"
              onChange={this.messageChange}
              placeholder="Your Message"
            />{' '}
            <br />
            <br />
            <button className="button" onClick={this.sendSMS}>
              Send SMS
            </button>
          </div>
          <button
            className="modal-close is-large"
            onClick={this.hideModal}
            aria-label="close"
          />
        </div>
      )
    }
    return (
      <div className="ma4 ba bw2">
        {modal}
        <div className="overflow-auto">
          <table className="f6 w-100 center">
            <thead>
              <tr className="stripe-dark">
                <th className="fw6 tc  pa3 bg-white column-title">Incident</th>
                <th className="fw6 tc pa3 bg-white column-title">Location</th>
                <th className="fw6  tc pa3 bg-white column-title">Time</th>
                <th className="fw6 tc pa3 bg-white column-title">From</th>
                <th className="fw6 tc pa3 bg-white column-title">Name</th>
                <th className="fw6 tc pa3 bg-white column-title">Message</th>
                <th className="fw6 tc pa3 bg-white column-title">Sentiment</th>
              </tr>
            </thead>
            <tbody className="lh-copy">
              {this.state.data
                .map((report, i) => {
                  return (
                    <tr key={i} className="stripe">
                      <td className="pa3 report">
                        <span> {report.labels ? report.labels[1] : ''}</span>
                        <span> {report.labels ? report.labels[2] : ''}</span>
                        <span> {report.labels ? report.labels[3] : ''}</span>
                        <span> {report.labels ? report.labels[4] : ''}</span>
                      </td>
                      <td className="pa3 report">
                        {' '}
                        <b>{report.address} </b>
                      </td>
                      <td className="pa3 report">
                        <b>
                          {' '}
                          {report.date} {report.time}
                        </b>
                      </td>
                      <td className="pa3 report">
                        {' '}
                        <b onClick={this.showModal.bind(this, report.from)}>
                          <span>{report.from} </span>
                        </b>
                      </td>
                      <td className="pa3 report">
                        {' '}
                        <b>{report.name} </b>
                      </td>

                      <td className="pa3 report">
                        <b>{report.text}</b>
                      </td>
                      <td className="pa3 report">
                        <b>{report.severity}</b>
                      </td>
                    </tr>
                  )
                })
                .reverse()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Reports
