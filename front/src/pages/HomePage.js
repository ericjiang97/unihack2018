import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

class HomePage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Calendar</h1>
        </header>
        <p className="App-intro">Home Page</p>
        <Button
          onClick={() =>
            (window.location.href = `${window.location.origin}/auth/google`)
          }
        >
          Login with Google
        </Button>
      </div>
    )
  }
}

export default HomePage
