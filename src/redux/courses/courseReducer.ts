import * as types from './types'
import { InitialState } from '../initialState'
import { CourseAction } from '../'
import { ICourse } from '../../models'
import { LoadCoursesSuccessAction,
         CreateCourseSuccessAction,
         UpdateCourseSuccessAction } from './courseActions'

/*
 * It's important to note that each reducer only handles
 * one slice of the state.  In the case of this reducer,
 * we're only concerned with the array of courses that is
 * contained in state.  That's why the 'state' variable
 * below is initialized to the 'courses' portion of the
 * initial state.
 */
export function courseReducer(
  state = InitialState.courses,
  action: CourseAction)
{
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses
    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course),
      ]
    case types.UPDATE_COURSE_SUCCESS:
      const courseIdUpdated = action.course.id
      const allOtherCourses = state.filter(course => course.id !== courseIdUpdated)
      const updatedCourseCopy = Object.assign({}, action.course)
      return [...allOtherCourses, updatedCourseCopy]

    default:
      return state
  }
}