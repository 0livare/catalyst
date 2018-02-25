import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Nav from './common/Navigation'
import HomePage  from './home/HomePage'
import AboutPage from './about/AboutPage'
import CoursesPage from './courses/CoursesPage'

/* eslint-disable react/jsx-no-bind */

class App extends Component {
  render() {
    return (
      <div>
        <Nav />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/courses" component={CoursesPage} />
          <Route component={() => <h3>404 page not found</h3>} />
        </Switch>
      </div>
    )
  }
}

export default App