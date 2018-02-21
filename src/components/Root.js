import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { HashRouter as Router, Route } from 'react-router-dom'

import App from './App';

export default class Root extends React.Component {
  render() {
    return (
      // All children of <AppContainer> will be hot reloaded when a change occurs
      // When in production, AppContainer is automatically disabled, and simply
      // returns its children.
      <AppContainer>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </AppContainer>
    )
  }
}
