import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import * as H from 'history'
import { match } from 'react-router'

import { ICourse, IAuthor, courseActions, RootState } from '../../redux'
import { CourseForm } from './CourseForm'


interface StateProps {
  initialCourse: ICourse,         // Not required when adding a new course
  authors: IAuthor[],
  courseId: string,
  history: H.History,            // Supplied by react router
}
interface DispatchProps {
  actions: typeof courseActions,
}
export interface ManageCoursePageProps extends StateProps, DispatchProps { }

export interface ManageCoursePageState {
  course: ICourse,
  errors: object,
}

type NamedTarget = {target: {name: string, value: any}}

class ManageCoursePage extends React.Component<ManageCoursePageProps, ManageCoursePageState> {
  constructor(props: ManageCoursePageProps) {
    super(props)

    let initialCourse = props.initialCourse || {
      id: props.courseId, title: '', watchUrl: '', authorId: '', length: '', category: ''
    }

    this.state = {
      course: Object.assign({}, props.initialCourse),
      errors: {},
    }

    this.updateCourseState = this.updateCourseState.bind(this)
    this.updateCourseAuthor = this.updateCourseAuthor.bind(this)
    this.saveCourse = this.saveCourse.bind(this)
  }

  updateCourseState(event: NamedTarget) {
    const field = event.target.name
    let course = Object.assign({}, this.state.course)

    // @ts-ignore
    course[field] = event.target.value

    return this.setState({course})
  }

  updateCourseAuthor(
    event: React.FormEvent<HTMLSelectElement>,
    index: number,
    payload: string)
  {
    let course = Object.assign({}, this.state.course)
    course.authorId = payload
    return this.setState({course})
  }

  saveCourse(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    this.props.actions.saveCourse(this.state.course)
    this.props.history.goBack()
  }

  render() {
    return (
      <CourseForm
        course={this.state.course}
        allAuthors={this.props.authors}
        onSave={this.saveCourse}
        onChangeText={this.updateCourseState}
        onChangeAuthor={this.updateCourseAuthor}
        saving={false}
        />
    )
  }
}

export interface ManageCoursePageConnected {
  match: match<ManageCoursePageProps>, // Supplied by react router

}

function mapStateToProps(state: RootState, ownProps: ManageCoursePageConnected) {
  const courseId = ownProps.match.params.courseId

  let course = null
  for(let c of state.courses) {
    if (c.id === courseId) {
      course = c
      break
    }
  }

  // Change authors from the format supplied by the reducer
  // (initlally from the API) into the format expected by the
  // CoarseForm.
  const authorsFormattedForDropdown = state.authors.map(author => ({
    id: author.id,
  }))

  return {
    initialCourse: course,
    authors: authorsFormattedForDropdown,
    courseId: courseId,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
export { container as ManageCoursePage }