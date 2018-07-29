import React, { Component } from 'react'
import { connect } from 'react-redux'

import EventList from '../components/EventList'
import { createNotification } from '../ducks/notifications'
import { loadEvents, updateEventList } from '../ducks/events'
import EventsModal from '../components/EventModal'
import { Typography, Divider, Button, Switch } from '@material-ui/core'

class CalendarPage extends Component {
  state = {
    toggle: false,
  }
  componentDidMount = () => {
    this.props.createNotification('Loading Events!')
    this.props.loadEvents()
  }
  handleChange = name => event => {
    const { checked } = event.target
    if (checked) {
      this.props.updateEventList()
    } else {
      this.props.loadEvents()
    }
  }

  render() {
    return (
      <div className="App" style={{ marginTop: 5 }}>
        <header className="App-header">
          <Typography variant="title">Calendar</Typography>
          <Typography variant="subheading">
            We have imported your calendar for the next week below
          </Typography>
          <Switch
            checked={this.state.checkedA}
            onChange={this.handleChange('checkedA')}
          />
        </header>
        <Divider />
        <EventsModal />
        <EventList />
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateEventList,
  createNotification,
  loadEvents,
}

export default connect(
  null,
  mapDispatchToProps
)(CalendarPage)
