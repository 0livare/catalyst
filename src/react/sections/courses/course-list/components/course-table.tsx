import * as React from 'src/react/layout/snackbar/node_modules/react'

import {ICourse} from 'src/models'
import {CourseTableRow} from './course-table-row'

export interface ICourseTableProps {
  courses: ICourse[],
}

export const CourseTable: React.SFC<ICourseTableProps> = (props) => {
  return (
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
          <CourseTableRow key={course.id} course={course} />,
        )
      }
      </tbody>
    </table>
  )
}