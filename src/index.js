/*eslint-disable import/default */
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import 'bootstrap/dist/css/bootstrap.min.css'
import configureStore from './store/configureStore'
import Root from './components/Root'
import { loadCourses } from './actions/courseActions'

const store = configureStore()
store.dispatch(loadCourses())

const htmlRoot = document.getElementById('app')

render(
  // All children of <AppContainer> will be hot reloaded when a change occurs
  // When in production, AppContainer is automatically disabled, and simply
  // returns its children.
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  htmlRoot
)

// Hot Module Replacement API
// Must be placed directly below the call to react-dom#render
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,
      htmlRoot
    );
  });
}