import { ICourse } from './courses'
import { IAuthor } from './authors'

/*
 * The interface exported from this file depicts the overall structure
 * of our redux store.  Each reducer deals with a peice of the store,
 * but this will give you an idea of what the whole thing looks like.
 */
export type RootState = {
  authors: IAuthor[],
  courses: ICourse[],
  ajaxCallsInProgress: number,
}