import React from 'react'
import { connect } from 'react-redux'

import List from '@material-ui/core/List'

import EventItem from './EventItem'

class EventList extends React.Component {
  render = () => {
    const { events, isFetching, error } = this.props
    if (isFetching) return <h1>FETCHING</h1>
    if (error !== null) return <h1>ERROR: {error.toString()}</h1>
    return <List>{events.map(event => <EventItem {...event} />)}</List>
  }
}

const mapStateToProps = state => ({
  ...state.events,
})

export default connect(mapStateToProps)(EventList)
