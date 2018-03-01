import * as types from './types'
import { RootState, AuthorAction } from '../'
import initialState from '../initialState'


export function authorReducer(state = initialState.authors, action: AuthorAction) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors

    default:
      return state
  }
}