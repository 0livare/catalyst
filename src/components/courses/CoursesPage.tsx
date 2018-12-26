import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

import {  RootState, courseActions, RootDispatch } from '../../redux'
import { CourseList } from './CourseList'
import ManageCoursePage from './ManageCoursePage'
import { bindActionCreator } from 'src/util/reduxUtil'
import { IReactRouterProps } from 'src/util/reactRouterUtil'

export type ICoursePageProps =
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>
  & IReactRouterProps<any>

export class CoursesPage extends React.Component<ICoursePageProps> {
  constructor(props: ICoursePageProps) {
    super(props)
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this)
  }

  private redirectToAddCoursePage() {
    // To be consistent with the schema, the id for this new
    // course should be a guid. But I don't want to add another
    // dependency just for that when we're working with mock
    // data here anyway.
    const crappyId = Math.floor(Math.random() * 999999999)

    // 'history' is supplied through the react context
    // by react-router, which basically means that it
    // will automatically be in the props of every
    // component
    this.props.history.push(`/courses/a${crappyId}`)
  }

  /* tslint:disable:no-shadowed-variable */
  public render() {
    const { courses, match } = this.props

    const courseList = (
      <CourseList
        courses={courses}
        redirectToAddCoursePage={this.redirectToAddCoursePage}
      />)

    /* tslint:disable:jsx-no-lambda */
    return (
      <Switch>
        <Route
          exact
          path={match.path}
          render={() => courseList}
        />
        <Route
          exact
          path={`${match.path}/:courseId`}
          component={ManageCoursePage}
        />
      </Switch>
     )
  }
}

function mapStateToProps(state: RootState) {
  if (!state.courses) return {}

  const courses = [...state.courses]
  courses.sort((a, b) => a.title.localeCompare(b.title))
  return { courses }
}

function mapDispatchToProps(dispatch: RootDispatch) {
  // Binding action creators individually results in correct
  // static typing of this method, whereas using Redux.bindActionCreators
  // does not.
  return {actions: {
    loadCourses: bindActionCreator(courseActions.loadCourses, dispatch),
    saveCourse: bindActionCreator(courseActions.saveCourse, dispatch),
  }}
}

const container = connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
export { container as default }