import React from 'react'
import { DialogActions } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { connect } from 'react-redux'
import { closeModal } from '../ducks/event_modal'

class EventsModal extends React.Component {
  render = () => {
    return (
      <div>
        <Dialog open={this.props.open} onClose={() => this.props.closeModal()}>
          <DialogActions>
            <Button onClick={() => this.props.closeModal()} color="primary">
              Disagree
            </Button>
            <Button
              onClick={() => this.props.closeModal()}
              color="primary"
              autoFocus
            >
              Agree
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
