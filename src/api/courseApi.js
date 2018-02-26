import { get, post } from './fetchHttp'

export default {
  getAllCourses: function() {
    return get('courses')
  },

  saveCourse: function(course) {
    console.log("Saved course: ", course)
    return post('courses', course)
  }
}