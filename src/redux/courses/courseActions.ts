import * as types from './types'
import {ICourse} from '../../models'
import courseApi from '../../api/courseApi'

import {
  OtherAction,
  beginAjaxCall,
  ajaxCallError,
  RootThunkAction,
} from '../'
import {createThunk} from 'src/util/reduxUtil'

/*************************
 * ACTION TYPES/CREATORS
 *************************/

export type LoadCoursesSuccessAction = {
  type: types.LOAD_COURSES_SUCCESS,
  courses: ICourse[],
}
export function loadCoursesSuccess(courses: ICourse[]): LoadCoursesSuccessAction {
  return {type: types.LOAD_COURSES_SUCCESS, courses}
}

export type CreateCourseSuccessAction = {
  type: types.CREATE_COURSE_SUCCESS,
  course: ICourse,
}
export function createCourseSuccess(course: ICourse): CreateCourseSuccessAction {
  return {type: types.CREATE_COURSE_SUCCESS, course}
}

export type UpdateCourseSuccessAction = {
  type: types.UPDATE_COURSE_SUCCESS,
  course: ICourse,
}
export function updateCourseSuccess(course: ICourse): UpdateCourseSuccessAction {
  return {type: types.UPDATE_COURSE_SUCCESS, course}
}

/*************************
 * ACTION TYPE UNION
 *************************/

export type CourseAction =
  | LoadCoursesSuccessAction
  | CreateCourseSuccessAction
  | UpdateCourseSuccessAction
  | OtherAction

/*************************
 * THUNKS
 *************************/

export function loadCourses(): RootThunkAction<Promise<ICourse[]>> {
  return createThunk({
    begin: beginAjaxCall,
    api: courseApi.getAllCourses,
    success: loadCoursesSuccess,
    fail: ajaxCallError,
  })
}

export function saveCourse(course: ICourse): RootThunkAction<Promise<ICourse>> {
  return createThunk({
    begin: beginAjaxCall,
    api: () => courseApi.saveCourse(course),
    success: (c: ICourse) => {
      const action = course.id
        ? updateCourseSuccess
        : createCourseSuccess
      return action(c)
    },
    fail: ajaxCallError,
  })
}