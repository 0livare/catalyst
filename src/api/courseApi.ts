import { get, post } from './fetchHttp'
import { ICourse } from '../redux'

class CourseApi {
  getAllCourses(): Promise<ICourse[]> {
    return get('courses')
  }

  async saveCourse(course: ICourse): Promise<any> {
    return post('courses', course)
  }
}

export default new CourseApi()