import {IAuthor, ICourse} from '../models'
import courseApi from './courseApi'

class AuthorApi {
  public getAllAuthors(): Promise<IAuthor[]> {
    return courseApi.getAllCourses().then((courses: ICourse[]) => {
      const allAuthorEntries = courses.map(course => course.authorId)

      const uniqueAuthors = Array.from(new Set(allAuthorEntries))
      return uniqueAuthors.map((author) => ({id: author}))
    })
  }
}

export default new AuthorApi()