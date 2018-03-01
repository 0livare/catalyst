import { createStore, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { RootState, rootReducer, RootAction } from '../'
import initialState from '../initialState'
import thunk, { ThunkAction, ThunkMiddleware } from 'redux-thunk'

function configureStore(state: RootState = initialState) {
  const middleware = applyMiddleware(
    thunk as ThunkMiddleware<RootState, RootAction>,
    reduxImmutableStateInvariant()
  )

  const store = createStore(
    rootReducer,
    middleware,
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      const nextReducer = require('../rootReducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    })
  }

  return store
}

export { configureStore }