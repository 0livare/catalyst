import {
  combineReducers,
  Reducer,
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