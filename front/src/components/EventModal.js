import React from 'react'
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { connect } from 'react-redux'
import { closeModal } from '../ducks/event_modal'

class EventsModal extends React.Component {
  render = () => {
    const { title, description, end, start } = this.props.event
    console.log(this.props.event)
    return (
      <div>
        <Dialog open={this.props.open} onClose={() => this.props.closeModal()}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <div dangerouslySetInnerHTML={{ __html: description }} />
            <Select value={this.props.event.priority} name="Priority">
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={6}>5</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.closeModal()} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => this.props.closeModal()}
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsModal)
