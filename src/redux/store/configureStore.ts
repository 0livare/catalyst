import { createStore, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { RootState, rootReducer, RootAction, InitialState } from '../'

export function configureStore(state: RootState = InitialState) {
  let middleware = applyMiddleware(
    thunk as ThunkMiddleware<RootState, RootAction>,
    /// #if DEBUG
    reduxImmutableStateInvariant(), // For development only! Remove for production
    /// #endif
  )

  /// #if DEBUG
  middleware = composeWithDevTools(middleware) as any
  /// #endif

  const store = createStore(
    rootReducer,
    middleware,
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      const nextReducer = require('../rootReducer').rootReducer // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  return store
}