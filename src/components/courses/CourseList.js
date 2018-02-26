import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import CourseListRow from './CourseListRow'

const CourseList = ({courses, redirectToAddCoursePage}) => {
  return (
    <div>
      <h1>Courses</h1>
      <Button
        type="submit"
        onClick={redirectToAddCoursePage}
        bsStyle="primary"
        >Add Course</Button>


      <table className="table">
        <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
        </thead>
        <tbody>
        {courses.map(course =>
          <CourseListRow key={course.id} course={course}/>
        )}
        </tbody>
      </table>
    </div>
  )
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  redirectToAddCoursePage: PropTypes.func.isRequired,
}

export default CourseList