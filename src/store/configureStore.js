import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
  const middleware = applyMiddleware(
    thunk,
    reduxImmutableStateInvariant()
  )

  const store = createStore(
    rootReducer,
    initialState,
    middleware
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    })
  }

  return store
}