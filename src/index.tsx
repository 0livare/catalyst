import 'babel-polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {configureStore} from './redux'
import {loadCourses, loadAuthors} from './redux'

import Root from './react/Root'

const store = configureStore()
store.dispatch(loadCourses())
store.dispatch(loadAuthors())

const htmlRoot = document.getElementById('app')
ReactDOM.render(<Root store={store} />, htmlRoot)

// This may no longer be necessary with react-hot-loader 4?
// Hot Module Replacement API
// Must be placed directly below the call to react-dom#render
if (module.hot) {
  module.hot.accept('./react/Root', () => {
    const NewRoot = require('./react/Root').default
    ReactDOM.render(<NewRoot store={store} />, htmlRoot)
  })
}