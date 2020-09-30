import * as React from 'react'
import {Switch, Route} from 'react-router'

import CourseListPage from './course-list/course-list-page'
import EditCoursePage from './course-edit/edit-course-page'
import {FourOhFourPage} from 'src/react/components/four-oh-four-page'

export const CoursePage: React.SFC<{}> = () => {
  return (
    <Switch>
      <Route exact path='/courses' component={CourseListPage} />
      <Route exact path='/courses/:courseId' component={EditCoursePage} />
      <Route component={FourOhFourPage} />
    </Switch>
  )
}