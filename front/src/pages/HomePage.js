import React, { Component } from 'react'
import { Button, Typography } from '@material-ui/core'

class HomePage extends Component {
  render() {
    return (
      <div
        style={{
          flex: 1,
          backgroundImage:
            "linear-gradient(to top, rgba(46, 49, 65, 0.5), rgba(46, 49, 65, 0.5)),url('https://img.etsystatic.com/il/4e5483/1163107550/il_fullxfull.1163107550_cpzr.jpg?version=0')",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <header className="App-header">
          <Typography
            style={{ color: 'white' }}
            variant="display1"
            gutterBottom
          >
            Welcome to CalAd
          </Typography>
        </header>
        <Typography
          style={{ color: 'white' }}
          variant="subheading"
          gutterBottom
        >
          Helping you make the best of events on your calendar
        </Typography>
        <Button href="/onboarding/step1" style={{ color: 'white' }}>
          To Begin Login
        </Button>
        <Typography style={{ color: 'white' }} variant="caption" gutterBottom>
          By logging in your are accepting our{' '}
          <a href="">Terms of Use policy</a>
        </Typography>
      </div>
    )
  }
}

export default HomePage
