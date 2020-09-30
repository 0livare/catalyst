import {Reducer} from 'redux'
import {RootState, InitialState, RootAction} from '.'
import {
  courseReducer,
  authorReducer,
  ajaxStatusReducer,
  notificationReducer,
} from '.'

const rootReducer: Reducer<RootState> = (state = InitialState, action) => {
  // Reducers that manipulate the entire Redux state
  state = chainReducers(action, state, [
    courseReducer,
  ])

  // Reducers that only manipulate a section of the state
  return {
    ...state,
    ajaxCallsInProgress: ajaxStatusReducer(state.ajaxCallsInProgress, action),
    authors: authorReducer(state.authors, action),
    notifications: notificationReducer(state.notifications, action),
  }
}

export {rootReducer}

function chainReducers(
  action: RootAction,
  initialState: RootState,
  reducers: Array<(state: RootState, action: RootAction) => RootState>,
) {
  return reducers.reduce(
    (nextState, nextReducer) => nextReducer(nextState, action),
    initialState)
}