import React from 'react'
import PropTypes from 'prop-types'

import ListItem from '@material-ui/core/Card'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import {
  AddCircle as AddIcon,
  RemoveCircle as RemoveIcon,
} from '@material-ui/icons'

class EventItem extends React.Component {
  handleIncrement = () => {}

  handleDecrement = () => {}

  render = () => {
    const { summary } = this.props
    return (
      <ListItem>
        <ListItemText>{summary}</ListItemText>
        <IconButton onClick={this.handleIncrement}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={this.handleDecrement}>
          <RemoveIcon />
        </IconButton>
      </ListItem>
    )
  }
}

EventItem.propTypes = {
  title: PropTypes.string.isRequired,
}

export default EventItem
