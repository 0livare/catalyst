import { get, post } from './fetchHttp'
import { ICourse } from '../redux'

class CourseApi {
  getAllCourses(): Promise<ICourse[]> {
    return get('courses')
  }

  saveCourse(course: ICourse): Promise<any> {
    console.log("Saved course: ", course)
    return post('courses', course)
  }
}

export default new CourseApi()