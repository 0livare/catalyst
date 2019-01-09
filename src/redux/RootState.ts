import {ICourse, IAuthor, INotification} from 'src/models'
import {CourseState, InitialCourseState} from './courses'

/*
 * This type depicts the overall structure of our redux store.
 */
export type RootState = {
  authors: IAuthor[],
  courseState: CourseState,
  ajaxCallsInProgress: number,
  notifications: INotification[],
}

export const InitialState: RootState = {
  authors: [],
  courseState: InitialCourseState,
  ajaxCallsInProgress: 0,
  notifications: [],
}