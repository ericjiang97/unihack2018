import React from 'react'
import { connect } from 'react-redux'
import BigCalendar from 'react-big-calendar'
import List from '@material-ui/core/List'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import EventItem from './EventItem'
import { createEventModal } from '../../ducks/event_modal'
class EventList extends React.Component {
  state = {
    events: [],
  }
  render = () => {
    const { events, isFetching, error, showChanged } = this.props

    if (isFetching) return <h1>FETCHING</h1>
    if (error !== null) return <h1>ERROR: {error.toString()}</h1>
    return (
      <BigCalendar
        selectable
        localizer={BigCalendar.momentLocalizer(moment)}
        events={events}
        defaultView={BigCalendar.Views.WEEK}
        scrollToTime={new Date()}
        defaultDate={new Date()}
        onSelectEvent={event => {
          console.log(event)
          this.props.createEventModal(event)
        }}
        onSelectSlot={event => {
          console.log(event)
        }}
        eventPropGetter={(event, start, end, isSelected) => {
          console.log(event)
          if (showChanged) {
            let newStyle = {
              backgroundColor: '#006CAB',
              color: 'white',
              borderRadius: '0px',
              border: 'none',
            }

            if (event.isLate) {
              newStyle.backgroundColor = 'red'
            }

            return {
              className: '',
              style: newStyle,
            }
          } else {
            let newStyle = {
              backgroundColor: '#03a9f4',
              color: 'white ',
              borderRadius: '0px',
              border: 'none',
            }

            return {
              className: '',
              style: newStyle,
            }
          }
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...state.events,
})

const mapDispatchToProps = {
  createEventModal,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList)
