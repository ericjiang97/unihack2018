import React, { Component } from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import Logo from '../images/calad-icon-single.png'
import { AccountCircle } from '@material-ui/icons'

class HeaderBar extends Component {
  render() {
    return (
      <AppBar position="sticky">
        <Toolbar style={{ padding: '10px' }}>
          <img
            src={Logo}
            alt="Calad Logo"
            style={{ width: '100px', height: '100px' }}
          />
          <h1 style={{ marginTop: '50px' }}>CALAD</h1>
          <AccountCircle style={{ width: '50px', height: '50px' }} />
        </Toolbar>
      </AppBar>
    )
  }
}

export default HeaderBar
