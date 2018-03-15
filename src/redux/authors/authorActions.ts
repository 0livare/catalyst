import { ThunkResult } from '../'
import authorApi from '../../api/authorApi'
import { LOAD_AUTHORS_SUCCESS } from './types'
import { IAuthor } from '../../models'
import { OtherAction, beginAjaxCall } from '../'

/*************************
 * ACTION TYPES/CREATORS
 *************************/

export type LoadAuthorsSuccessAction = {
  type: LOAD_AUTHORS_SUCCESS,
  authors: IAuthor[],
}
export function loadAuthorsSuccess(authors: IAuthor[]): AuthorAction {
  return {type: LOAD_AUTHORS_SUCCESS, authors}
}


/*************************
 * ACTION TYPE UNION
 *************************/

export type AuthorAction =
  | LoadAuthorsSuccessAction
  | OtherAction



/*************************
 * THUNKS
 *************************/

export function loadAuthors() : ThunkResult<void> {
  return async (dispatch, getState) => {
    dispatch(beginAjaxCall())
    const authors = await authorApi.getAllAuthors()
    dispatch(loadAuthorsSuccess(authors))
  }
}