import * as React from 'react'
import {Provider} from 'react-redux'
import {HashRouter as Router, Route} from 'react-router-dom'
import {Store} from 'redux'
import {hot} from 'react-hot-loader'
import CssBaseline from '@material-ui/core/CssBaseline'

import {App} from './App'

export interface IRootProps { store: Store<any> }

/*
 * This must be a component, not an SFC in order
 * to be hot reloaded properly
 */
class Root extends React.Component<IRootProps, {}> {
  public render() {
    return (
      <>
        <CssBaseline />
        <Provider store={this.props.store}>
          <Router>
            <Route path='/' component={App} />
          </Router>
        </Provider>
      </>
    )
  }
}

export default hot(module)(Root)