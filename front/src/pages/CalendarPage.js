import React, { Component } from 'react'
import { connect } from 'react-redux'

import EventList from '../components/EventList'
import { createNotification } from '../ducks/notifications'
import { loadEvents } from '../ducks/events'
import EventsModal from '../components/EventModal'
import { Typography, Divider } from '@material-ui/core'

class CalendarPage extends Component {
  componentDidMount = () => {
    this.props.createNotification('Loading Events!')
    this.props.loadEvents()
  }

  render() {
    return (
      <div className="App" style={{ marginTop: 5 }}>
        <header className="App-header">
          <Typography variant="title">Calendar</Typography>
          <Typography variant="subheading">
            We have imported your calendar for the next week below
          </Typography>
        </header>
        <Divider />
        <EventsModal />
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
