import * as React from 'react'
import {Button} from 'react-bootstrap'

import {ICourse} from 'src/models'
import {CourseListRow} from './CourseListRow'

export interface ICourseListProps {
  courses: ICourse[],
  redirectToAddCoursePage: () => void,
}

export const CourseList: React.SFC<ICourseListProps> = ({courses, redirectToAddCoursePage}) => {
  return (
    <div>
      <h1>Courses</h1>
      <Button
        type='submit'
        onClick={redirectToAddCoursePage}
        bsStyle='primary'
      >
        Add Course
      </Button>

      <table className='table'>
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
        {courses && courses.map(course =>
          <CourseListRow key={course.id} course={course} />,
        )}
        </tbody>
      </table>
    </div>
  )
}