import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import * as Pages from './pages'
import HeaderBar from './components/HeaderBar'
import Notifications from './components/Notifications'

class App extends Component {
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

export default App
