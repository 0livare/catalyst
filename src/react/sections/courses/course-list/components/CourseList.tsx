import * as React from 'react'
import {Button} from 'react-bootstrap'

import {ICourse} from 'src/models'
import {CourseListRow} from './CourseListRow'

export interface ICourseListProps {
  courses: ICourse[],
  onAddCourse: () => void,
}

export const CourseList: React.SFC<ICourseListProps> = (props) => {
  return (
    <div>
      <h1>Courses</h1>
      <Button
        type='submit'
        onClick={props.onAddCourse}
        bsStyle='primary'
      >
        Add Course
      </Button>

      <table className='table' style={{fontSize: '1.6rem'}}>
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
        {
          props.courses && props.courses.map(course =>
            <CourseListRow key={course.id} course={course} />,
          )
        }
        </tbody>
      </table>
    </div>
  )
}