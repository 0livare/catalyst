import authorApi from '../api/authorApi'
import * as types from './actionTypes'

export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors}
}

export function loadAuthors() {
  return dispatch => {
    return authorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors))
    })
  }
}