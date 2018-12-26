import * as types from './types'
import { InitialState } from '../rootState'
import { CourseAction } from '../'
import { ICourse } from 'src/models'

/*
 * It's important to note that each reducer only handles
 * one slice of the state.  In the case of this reducer,
 * we're only concerned with the array of courses that is
 * contained in state.  That's why the 'state' variable
 * below is initialized to the 'courses' portion of the
 * initial state.
 */
export function courseReducer(
  state: ICourse[] = InitialState.courses,
  action: CourseAction)
{
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses
    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        {...action.course},
      ]
    case types.UPDATE_COURSE_SUCCESS:
      if (!action.course) return state

      const courseIdUpdated = action.course.id
      const allOtherCourses = state.filter(course => course.id !== courseIdUpdated)
      return [
        ...allOtherCourses,
        {...action.course},
      ]

    default:
      return state
  }
}