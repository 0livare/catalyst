import {combineReducers, Reducer} from 'redux'
import {
  RootState,
  courseReducer,
  authorReducer,
  ajaxStatusReducer,
  notificationReducer,
} from './'

const rootReducer: Reducer<RootState> = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
  ajaxCallsInProgress: ajaxStatusReducer,
  notifications: notificationReducer,
})

export {rootReducer}