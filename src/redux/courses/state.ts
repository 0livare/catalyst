import {ICourse} from 'src/models'

export type CourseState = {
  courses: ICourse[],
  isLoadingCourse: boolean,
}

export const InitialCourseState: CourseState = {
  courses: [],
  isLoadingCourse: false,
}