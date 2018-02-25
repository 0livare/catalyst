import * as types from './actionTypes'
import courseApi from '../api/courseApi'

export function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses,
  }
}

export function loadCourses() {
  return function(dispatch) {
    let allCourses = courseApi.getAllCourses()
    return allCourses.then(courses => {
      dispatch(loadCoursesSuccess(courses))
    })
  }
}