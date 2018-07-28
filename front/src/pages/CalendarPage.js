import React, { Component } from 'react'
import { connect } from 'react-redux'

import EventList from '../components/EventList'
import { createNotification } from '../ducks/notifications'
import { loadEvents } from '../ducks/events'
import EventsModal from '../components/EventModal'

class CalendarPage extends Component {
  componentDidMount = () => {
    this.props.createNotification('Loading Events!')
    this.props.loadEvents()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Calendar</h1>
        </header>

        <EventsModal />
        <p className="App-intro">Calendar Page</p>
        <EventList />
      </div>
    )
  }
}

const mapDispatchToProps = {
  createNotification,
  loadEvents,
}

export default connect(
  null,
  mapDispatchToProps
)(CalendarPage)
