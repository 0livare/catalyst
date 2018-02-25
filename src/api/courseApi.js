import { get } from './fetchHttp'


function getAllCourses() {
  return get('courses')
}

export default {
  getAllCourses
}