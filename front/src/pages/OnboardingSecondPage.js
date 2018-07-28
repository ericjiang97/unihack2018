import React, { Component } from 'react'
import {
  Avatar,
  Button,
  Typography,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Divider,
} from '@material-ui/core'
import { connect } from 'react-redux'
import Fade from '@material-ui/core/Fade'

class OnboardingFirstPage extends Component {
  state = { consecutiveMeetings: 'before', acceptBothEvents: 'both' }
  render() {
    const { account } = this.props
    const { isAuth, user } = account
    return (
      <div
        style={{
          flex: 1,
          backgroundImage:
            "linear-gradient(to top, rgba(46, 49, 65, 0.5), rgba(46, 49, 65, 0.5)),url('https://img.etsystatic.com/il/4e5483/1163107550/il_fullxfull.1163107550_cpzr.jpg?version=0')",

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          padding: 10,
        }}
      >
        <Fade in={true} timeout={1500}>
          <header className="App-header">
            <Typography
              variant="display1"
              gutterBottom
              style={{ color: 'white' }}
            >
              First a bit about you...
            </Typography>
          </header>
        </Fade>
        <Fade in={true} timeout={1500}>
          <Typography
            variant="subheading"
            gutterBottom
            style={{ color: 'white' }}
          >
            Let us help you make the best of your events on your calendar.
            Whether it's conferences, meetings with execs, etc.
          </Typography>
        </Fade>
        <Divider />
        <Fade in={true} timeout={1750}>
          <div>
            <Typography variant="title" gutterBottom style={{ color: 'white' }}>
              Consecutive events
            </Typography>
            <Typography
              variant="subheading"
              gutterBottom
              style={{ color: 'white' }}
            >
              When you have Consecutive (or back-to-back events), would you
              prefer:
            </Typography>
            <ul>
              <li>Leave previous event early</li>
              <li>Arrive next event late</li>
            </ul>

            <FormControl>
              <InputLabel htmlFor="name-readonly">Name</InputLabel>
              <Select
                value={this.state.consecutiveMeetings}
                onChange={event => {
                  this.setState({
                    consecutiveMeetings: event.target.value,
                  })
                }}
                input={
                  <Input
                    name="Select a choice"
                    id="name-readonly"
                    style={{ color: 'white' }}
                  />
                }
              >
                <MenuItem value="before">Leave event early</MenuItem>
                <MenuItem value="after">Arrive next event late</MenuItem>
              </Select>
            </FormControl>
            <Divider style={{ marginBottom: 10 }} />
            <Typography variant="title" gutterBottom style={{ color: 'white' }}>
              Leave half way for longer events
            </Typography>
            <Typography
              variant="subheading"
              gutterBottom
              style={{ color: 'white' }}
            >
              When you have an event for the whole day, and another important
              event in the middle of the day, would you like to accept both
              events:
            </Typography>
            <FormControl>
              <InputLabel htmlFor="acceptBothEvents">Select one:</InputLabel>
              <Select
                value={this.state.acceptBothEvents}
                onChange={event => {
                  this.setState({
                    acceptBothEvents: event.target.value,
                  })
                }}
                input={
                  <Input
                    name="Select a choice"
                    id="acceptBothEvents"
                    style={{ color: 'white' }}
                  />
                }
              >
                <MenuItem value="both">Accept both events</MenuItem>
                <MenuItem value="reject">Reject both events</MenuItem>
                <MenuItem value="decide">Prompt me to decide</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Fade>
        <Fade in={true} timeout={2200}>
          <Button variant="raised" color="primary" href="./final">
            Submit
          </Button>
        </Fade>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account,
})
export default connect(mapStateToProps)(OnboardingFirstPage)
