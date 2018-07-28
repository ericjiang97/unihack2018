import React from 'react'
import { connect } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import { dismissNotification } from '../ducks/notifications'

class Notifications extends React.Component {
  render = () => {
    const { open, message, dismissNotification } = this.props
    return (
      <Snackbar
        autoHideDuration={1000}
        open={open}
        onClose={dismissNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent message={message} />
      </Snackbar>
    )
  }
}

const mapStateToProps = state => ({
  open: state.notifications.length > 0,
  message: state.notifications[0] || '',
})

const mapDispatchToProps = {
  dismissNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
