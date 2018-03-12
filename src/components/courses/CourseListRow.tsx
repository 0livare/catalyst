import * as React from 'react'
import { Link } from 'react-router-dom'

import { ICourse } from '../../models'

export interface CourseListRowProps {
  course: ICourse,
}

export const CourseListRow: React.SFC<CourseListRowProps> = ({course}) => {
  return (
    <tr>
      <td><a target="_blank">Watch</a></td>
      <td><Link to={'/courses/' + course.id}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
    </tr>
  )
}