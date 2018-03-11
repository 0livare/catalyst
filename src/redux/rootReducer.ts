import {
  combineReducers,
  Reducer, Dispatch,
  Store,
  Action,
} from 'redux'
import {
  RootState,
  courseReducer,
  authorReducer,
  ajaxStatusReducer,
} from './'


const rootReducer: Reducer<RootState> = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
  ajaxCallsInProgress: ajaxStatusReducer,
})

export { rootReducer }