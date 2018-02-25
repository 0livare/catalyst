import { get } from './fetchHttp'
import courseApi from './courseApi'

function getAllAuthors() {
  return courseApi.getAllCourses().then(courses => {
    return courses.map(course => ({
      id: course.authorId,
    }))
  })
}

export default { getAllAuthors }