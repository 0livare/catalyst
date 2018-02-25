import * as types from './actionTypes'
import courseApi from '../api/courseApi'

/*************************
 * ACTION CREATORS
 *************************/

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses }
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course }
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course }
}

/*************************
 * THUNKS
 *************************/

export function loadCourses() {
  return function(dispatch) {
    let allCourses = courseApi.getAllCourses()
    return allCourses.then(courses => {
      dispatch(loadCoursesSuccess(courses))
    })
  }
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    return courseApi.saveCourse(course).then(savedCourse => {
      if (course.id) {
        dispatch(updateCourseSuccess(savedCourse))
      } else {
        dispatch(createCourseSuccess(savedCourse))
      }
    })
  }
}