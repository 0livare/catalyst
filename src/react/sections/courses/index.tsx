import * as React from 'react'
import {Switch, Route} from 'react-router'

import CourseListPage from './course-list/CourseListPage'
import EditCoursePage from './course-edit/EditCoursePage'
import {FourOhFourPage} from 'src/react/components/FourOhFourPage'

export const CoursePage: React.SFC<{}> = () => {
  return (
    <Switch>
      <Route exact path='/courses' component={CourseListPage} />
      <Route exact path='/courses/:courseId' component={EditCoursePage} />
      <Route component={FourOhFourPage} />
    </Switch>
  )
}