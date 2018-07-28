import React, { Component } from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import logo from '../images/calad-icon-single.png'
import Typography from '@material-ui/core/Typography'

class HeaderBar extends Component {
  render() {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <img src={logo} style={{ height: 80 }} />
          <Typography variant="title">CALAD</Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default HeaderBar
