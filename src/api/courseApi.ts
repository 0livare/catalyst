import { get, post } from './fetchHttp'
import { ICourse } from '../models'

class CourseApi {
  public getAllCourses(): Promise<ICourse[]> {
    return get('courses')
  }

  public async saveCourse(course: ICourse): Promise<any> {
    return post('courses', course)
  }
}

export default new CourseApi()