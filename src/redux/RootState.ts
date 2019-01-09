import {ICourse, IAuthor, INotification} from 'src/models'

/*
 * This type depicts the overall structure of our redux store.
 */
export type RootState = {
  authors: IAuthor[],
  courses: ICourse[],
  ajaxCallsInProgress: number,
  notifications: INotification[],
}

export const InitialState: RootState = {
  authors: [],
  courses: [],
  ajaxCallsInProgress: 0,
  notifications: [],
}