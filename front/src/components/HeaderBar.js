import React, { Component } from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import logo from '../images/reverse.png'
import Typography from '@material-ui/core/Typography'

class HeaderBar extends Component {
  render() {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <a href="/">
            <img src={logo} style={{ height: 40 }} />
          </a>
        </Toolbar>
      </AppBar>
    )
  }
}

export default HeaderBar
