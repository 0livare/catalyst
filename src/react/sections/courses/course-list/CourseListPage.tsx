import * as React from 'react'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'

import {RootState, RootDispatch, loadCourses, saveCourse} from 'src/redux'
import {CourseList} from './components/CourseList'
import EditCoursePage from '../course-edit/EditCoursePage'
import {bindActionCreator} from 'src/util/reduxUtil'
import {IReactRouterProps} from 'src/util/reactRouterUtil'

export type ICourseListPageProps =
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>
  & IReactRouterProps<any>

export class CourseListPage extends React.Component<ICourseListPageProps> {
  private redirectToAddCourseListPage = () => {
    // To be consistent with the schema, the id for this new
    // course should be a guid. But I don't want to add another
    // dependency just for that when we're working with mock
    // data here anyway.
    const crappyId = Math.floor(Math.random() * 999999999)

    // 'history' is supplied through the react context
    // by react-router, which basically means that it
    // will automatically be in the props of every
    // component
    this.props.history.push(`/courses/${crappyId}`)
  }

  /* tslint:disable:no-shadowed-variable */
  public render() {
    const {courses, match} = this.props

    return (
      <Switch>
        <Route
          exact
          path={match.path}
          render={() => (
            <CourseList
              courses={courses}
              onAddCourse={this.redirectToAddCourseListPage}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/:courseId`}
          component={EditCoursePage}
        />
      </Switch>
     )
  }
}

function mapStateToProps(state: RootState) {
  if (!state.courses) return {}

  const courses = [...state.courses]
  courses.sort((a, b) => a.title.localeCompare(b.title))
  return {courses}
}

function mapDispatchToProps(dispatch: RootDispatch) {
  // Binding action creators individually results in correct
  // static typing of this method, whereas using Redux.bindActionCreators
  // does not.
  return {actions: {
    loadCourses: bindActionCreator(loadCourses, dispatch),
    saveCourse: bindActionCreator(saveCourse, dispatch),
  }}
}

const container = connect(mapStateToProps, mapDispatchToProps)(CourseListPage)
export {container as default}