import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Store } from 'redux'

import { App } from './App'

export interface IRootProps { store: Store<any> }

/*
 * This must be a component, not an SFC in order
 * to be hot reloaded properly
 */
export class Root extends React.Component<IRootProps, {}> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <Route path='/' component={App} />
        </Router>
      </Provider>
    )
  }
}