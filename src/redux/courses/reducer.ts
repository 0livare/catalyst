import * as types from './types'
import {InitialState, RootState} from 'src/redux'
import {CourseAction} from './actions'
import {ICourse, createNotification} from 'src/models'
import {CourseState} from './state'

// Some course actions require manipulation of the full state
export function courseReducer(
  state = InitialState,
  action: CourseAction,
): RootState {
  switch (action.type) {
    case types.UPDATE_COURSE_SUCCESS: {
      if (!action.course) return state

      const courseList = state.courseState.courses
      const courseIdUpdated = action.course.id
      const allOtherCourses = courseList.filter(course => course.id !== courseIdUpdated)

      return {
        ...state,
        notifications: [
          ...state.notifications,
          createNotification('Successfully saved course', 'success'),
        ],
        courseState: {
          ...state.courseState,
          courses: [
            ...allOtherCourses,
            {...action.course},
          ],
        },
      }
    }
    default: return {
      ...state,
      courseState: courseListReducer(state.courseState, action),
    }
  }
}

// While other actions only require manipulation of the
// course state.  These are captured in a separate function
// because the implementation of each case is made simpler
// by doing so, as it only requires copying the course state.
function courseListReducer(
  state: CourseState = InitialState.courseState,
  action: CourseAction,
): CourseState {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS: return {
      ...state,
      courses: action.courses,
    }
    case types.CREATE_COURSE_SUCCESS: return {
      ...state,
      courses: [
        ...state.courses,
        {...action.course},
      ],
    }
    default:
      return state
  }
}