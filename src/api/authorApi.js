import { get } from './fetchHttp'
import courseApi from './courseApi'

function getAllAuthors() {
  return courseApi.getAllCourses().then(courses => {
    let allAuthorEntries = courses.map(course => course.authorId)

    let uniqueAuthors = Array.from(new Set(allAuthorEntries))
    return uniqueAuthors.map((author) => ({id: author}))
  })
}

export default { getAllAuthors }