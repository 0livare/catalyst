import { combineReducers, Reducer, Dispatch, Store, Action } from 'redux'
import { RootState, courseReducer, authorReducer } from './'


const rootReducer: Reducer<RootState> = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
})

export { rootReducer }