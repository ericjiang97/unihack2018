import React from 'react'
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  Typography,
  Divider,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { CalendarToday } from '@material-ui/icons'
import { connect } from 'react-redux'
import { closeModal } from '../ducks/event_modal'
import { updateEventPirority } from '../ducks/events'
import moment from 'moment'

const ratings = [1, 2, 3, 4, 5]
class EventsModal extends React.Component {
  state = {
    priority: 1,
  }

  componentDidMount = () => {
    this.setState({
      priority: this.props.event.priority,
    })
  }

  render = () => {
    const {
      id,
      title,
      description,
      end,
      start,
      creator,
      organizer,
    } = this.props.event
    console.log(this.props.event)
    return (
      <div>
        <Dialog open={this.props.open} onClose={() => this.props.closeModal()}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <Typography>
              Organizer:{' '}
              {organizer && `${organizer.displayName} <${organizer.email}>`}
            </Typography>
            <Typography variant="caption">
              Creator: {creator && creator.email}
            </Typography>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <CalendarToday />
              <div style={{ flex: 1, marginLeft: 10 }}>
                <Typography variant="caption">
                  {moment(start).format('Do MMMM YYYY, h:mm:ss a')} -{' '}
                  {moment(end).format('Do MMMM YYYY, h:mm:ss a')}
                </Typography>
              </div>
            </div>
          </DialogContent>
          <DialogContent>
            <Typography variant="title" gutterBottom>
              Event Description
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: description }} />
            <Divider />
            <Typography variant="title" gutterBottom>
              Priority
            </Typography>
            <Typography variant="subheading" gutterBottom>
              On a scale of 1 to 5, how important is this event?
            </Typography>
            <Select
              value={this.state.priority}
              name="Priority"
              onChange={event => {
                const newRating = event.target.value
                this.setState({
                  priority: newRating,
                })
              }}
            >
              {ratings.map(item => <MenuItem value={item}>{item}</MenuItem>)}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.closeModal()} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.props.updateEventPirority(
                  this.props.event.id,
                  this.state.priority
                )

                this.props.closeModal()
              }}
              color="primary"
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  open: state.eventsModal.open,
  event: state.eventsModal.event,
})

const mapDispatchToProps = {
  closeModal,
  updateEventPirority,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsModal)
