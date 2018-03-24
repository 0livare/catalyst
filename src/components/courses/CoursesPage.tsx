import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import * as H from 'history'
import { match } from 'react-router'

import { ICourse } from '../../models'
import { CourseAction, RootState, courseActions } from '../../redux'
import { CourseList } from './CourseList'
import ManageCoursePage from './ManageCoursePage'

interface IStateProps {
  courses: ICourse[],
  match: match<ICoursePageProps>, // Supplied by react router
  history: H.History,            // Supplied by react router
}
interface IDispatchProps {
  actions: typeof courseActions
}
export interface ICoursePageProps extends IStateProps, IDispatchProps { }

export class CoursesPage extends React.Component<ICoursePageProps> {
  constructor(props: ICoursePageProps) {
    super(props);
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
  const courses = [...state.courses]
  courses.sort((a, b) => a.title.localeCompare(b.title))

  return { courses }
}

function mapDispatchToProps(dispatch: Dispatch<CourseAction>) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
export { container as default }