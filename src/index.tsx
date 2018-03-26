/*eslint-disable import/default */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { ThunkAction } from 'redux-thunk'

import { Root } from './components/Root'
import { loadCourses, loadAuthors } from './redux'
import { configureStore } from './redux'

// tslint:disable-next-line
const registerServiceWorker = require('./registerServiceWorker').default;

const store = configureStore()

store.dispatch(loadCourses())
store.dispatch(loadAuthors())

const htmlRoot = document.getElementById('app')

ReactDOM.render(
  // All children of <AppContainer> will be hot reloaded when a change occurs
  // When in production, AppContainer is automatically disabled, and simply
  // returns its children.
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  htmlRoot,
)

// Register the service worker to enable offline functionality
/// #if !DEBUG

/// #endif

// Hot Module Replacement API
// Must be placed directly below the call to react-dom#render
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').Root;
    ReactDOM.render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,
      htmlRoot,
    );
  });
}