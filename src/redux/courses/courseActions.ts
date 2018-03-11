import * as types from './types'
import courseApi from '../../api/courseApi'

import {
  ICourse,
  LOAD_COURSES_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
} from './types'
import {
  OtherAction,
  ThunkResult,
  beginAjaxCall,
} from '../'

/*************************
 * ACTION TYPES/CREATORS
 *************************/

export type LoadCoursesSuccessAction = {
  type: LOAD_COURSES_SUCCESS,
  courses: ICourse[],
};
export function loadCoursesSuccess(courses: ICourse[]): LoadCoursesSuccessAction {
  return { type: types.LOAD_COURSES_SUCCESS, courses }
}

export type CreateCourseSuccessAction = {
  type: CREATE_COURSE_SUCCESS,
  course: ICourse,
}
export function createCourseSuccess(course: ICourse): CreateCourseSuccessAction {
  return { type: types.CREATE_COURSE_SUCCESS, course }
}

export type UpdateCourseSuccessAction = {
  type: UPDATE_COURSE_SUCCESS,
  course: ICourse,
}
export function updateCourseSuccess(course: ICourse): UpdateCourseSuccessAction {
  return { type: types.UPDATE_COURSE_SUCCESS, course }
}


/*************************
 * ACTION TYPE UNION
 *************************/

export type CourseAction =
  | LoadCoursesSuccessAction
  | CreateCourseSuccessAction
  | UpdateCourseSuccessAction
  | OtherAction
  ;

/*************************
 * THUNKS
 *************************/

export function loadCourses() : ThunkResult<ICourse[]> {
  return async (dispatch, getState) => {
    dispatch(beginAjaxCall())
    const allCourses = await courseApi.getAllCourses()
    console.log('loaded courses', allCourses)
    dispatch(loadCoursesSuccess(allCourses))
    return allCourses
  }
}

export function saveCourse(course: ICourse) : ThunkResult<void> {
  return async (dispatch, getState) => {
    dispatch(beginAjaxCall())
    const savedCourse = await courseApi.saveCourse(course)
    const action = course.id
      ? updateCourseSuccess(savedCourse)
      : createCourseSuccess(savedCourse)

    dispatch(action)
  }
}

let courseActions = {
  loadCoursesSuccess,
  createCourseSuccess,
  updateCourseSuccess,
  loadCourses,
  saveCourse,
}
export { courseActions }