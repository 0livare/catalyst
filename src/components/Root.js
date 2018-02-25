import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'

import App from './App';

class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
