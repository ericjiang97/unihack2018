import React, { Component } from 'react'
import { Avatar, Button, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import Fade from '@material-ui/core/Fade'

class OnboardingFirstPage extends Component {
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
        {isAuth && (
          <Avatar
            alt="Remy Sharp"
            src={user.photos[0].value}
            style={{ height: 45, width: 45 }}
          />
        )}
        <Fade in={true} timeout={1500}>
          <header className="App-header">
            <Typography
              variant="display1"
              gutterBottom
              style={{ color: 'white' }}
            >
              Hello {isAuth && user.name.givenName}, Welcome to CalAd
            </Typography>
          </header>
        </Fade>
        <Fade in={true} timeout={2000}>
          <Typography
            variant="subheading"
            gutterBottom
            style={{ color: 'white' }}
          >
            This will help us build a profile in our system in order to help
            organise things to the best of your needs and preferences
          </Typography>
        </Fade>
        <Fade in={true} timeout={2200}>
          <Button variant="raised" color="primary" href="./step2">
            Lets Start
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
