import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CalendarPage from './pages/CalendarPage';
import EventPage from './pages/EventPage';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import Fallback from './pages/Fallback';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route path='/calendar' component={CalendarPage} />
          <Route path='/event' component={EventPage} />
          <Route path='/schedule' component={SchedulePage} />
          <Route component={Fallback} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
