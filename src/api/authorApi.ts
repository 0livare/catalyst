import { get } from './fetchHttp'
import { IAuthor, ICourse } from  '../redux'
import courseApi from './courseApi'


class AuthorApi {
  getAllAuthors() : Promise<IAuthor[]> {
    return courseApi.getAllCourses().then((courses: ICourse[]) => {
      let allAuthorEntries = courses.map(course => course.authorId)

      let uniqueAuthors = Array.from(new Set(allAuthorEntries))
      return uniqueAuthors.map((author) => ({id: author}))
    })
  }
}

export default new AuthorApi()