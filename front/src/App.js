import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Pages from './pages'
import HeaderBar from './components/HeaderBar'
import Notifications from './components/Notifications'
import EventsModal from './components/EventModal'
import { getUser } from './ducks/account/actions'
class App extends Component {
  componentDidMount = () => {
    this.props.getUser()
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div>
            <HeaderBar />
            <Switch>
              <Route exact path="/" component={Pages.HomePage} />
              <Route path="/calendar" component={Pages.CalendarPage} />
              <Route path="/event" component={Pages.EventPage} />
              <Route path="/schedule" component={Pages.SchedulePage} />
              <Route component={Pages.Fallback} />
            </Switch>
          </div>
        </BrowserRouter>
        <Notifications />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getUser,
}

export default connect(
  null,
  mapDispatchToProps
)(App)
