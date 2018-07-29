import React, { Component } from 'react'
import { Avatar, Button, Typography, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import Fade from '@material-ui/core/Fade'

const loadingMessages = [
  'Providing more information to our systems',
  'Knocking a few trees down',
  'Working on something awesome',
  'Ready to go!',
]
class OnboardingFirstPage extends Component {
  state = {
    step: 0,
    finishedLoading: false,
  }

  setDelay = step => {
    setTimeout(() => {
      this.setState({
        step,
      })
    }, 3000)
  }
  componentDidMount = () => {
    for (var i = 0; i < loadingMessages.length; i++) {
      this.setDelay(i)
    }
    this.setState({ finishedLoading: true })
  }
  render() {
    console.log(this.state)
    const { account } = this.props
    const { isAuth, user } = account
    return (
      <div
        style={{
          flex: 1,
          backgroundImage:
            "linear-gradient(to top, rgba(46, 49, 65, 0.5), rgba(46, 49, 65, 0.5)),url('https://img.etsystatic.com/il/4e5483/1163107550/il_fullxfull.1163107550_cpzr.jpg?version=0')",
          backgroundSize: 'cover',
          backgroundRepeat: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          padding: 10,
        }}
      >
        {!this.state.finishedLoading && <CircularProgress size={100} />}
        <Fade in={true} timeout={1500}>
          <header className="App-header">
            <Typography
              variant="display1"
              gutterBottom
              style={{ color: 'white' }}
            >
              {loadingMessages[this.state.step]}
            </Typography>
          </header>
        </Fade>

        <Fade in={true} timeout={2200}>
          <Button
            variant="raised"
            color="primary"
            href="/calendar"
            disabled={!this.state.finishedLoading}
          >
            Lets Go!
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
