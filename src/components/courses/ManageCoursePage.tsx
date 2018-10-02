import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { match, RouteComponentProps } from 'react-router'
import * as toastr from 'toastr'

import { ICourse, IAuthor, createCourseWithId } from '../../models'
import { courseActions, RootState } from '../../redux'
import { CourseForm } from './CourseForm'

interface IMatchParams { courseId: string }
interface IStateProps extends RouteComponentProps<IMatchParams> {
  initialCourse: ICourse,  // Not required when adding a new course
  authors: IAuthor[],
  courseId: string,        // Supplied by react router when adding a new course
}
interface IDispatchProps {
  actions: typeof courseActions,
}
export interface IManageCoursePageProps extends IStateProps, IDispatchProps { }

export interface IManageCoursePageState {
  course: ICourse,
  errors: object,
  saving: boolean,
}

type NamedTarget = {target: {name: string, value: any}}

export class ManageCoursePage extends React.Component<IManageCoursePageProps, IManageCoursePageState> {
  constructor(props: IManageCoursePageProps) {
    super(props)

    const initialCourse = props.initialCourse || createCourseWithId(this.props.courseId);

    this.state = {
      course: Object.assign({}, initialCourse),
      errors: {},
      saving: false,
    }

    this.updateCourseState = this.updateCourseState.bind(this)
    this.updateCourseAuthor = this.updateCourseAuthor.bind(this)
    this.saveCourse = this.saveCourse.bind(this)
  }

  public componentWillReceiveProps() {
    if (this.props.courseId !== this.state.course.id) {
      this.setState({course: this.props.initialCourse});
    }
  }

  public updateCourseState(event: NamedTarget) {
    const field = event.target.name
    const course = Object.assign({}, this.state.course)

    // @ts-ignore
    course[field] = event.target.value

    return this.setState({course})
  }

  private updateCourseAuthor(
    event: React.FormEvent<HTMLSelectElement>,
    index: number,
    payload: string)
  {
    const course = Object.assign({}, this.state.course)

    course.authorId = payload
    return this.setState({course})
  }

  private async saveCourse(event: React.MouseEvent<HTMLInputElement>) {
    event.preventDefault()

    try {
      this.setState({saving: true})
      await this.props.actions.saveCourse(this.state.course)
      toastr.success('Course saved!')
    } catch (error) {
      toastr.error(error)
    } finally {
      this.setState({saving: false})
      this.props.history.goBack()
    }
  }

  public render() {
    return (
      <CourseForm
        course={this.state.course}
        allAuthors={this.props.authors}
        onSave={this.saveCourse}
        onChangeText={this.updateCourseState}
        onChangeAuthor={this.updateCourseAuthor}
        saving={this.state.saving}
      />
    )
  }
}

function mapStateToProps(state: RootState, ownProps: IManageCoursePageProps) {
  const courseId = ownProps.match.params.courseId

  let course = null
  for (const c of state.courses) {
    if (c.id === courseId) {
      course = c
      break
    }
  }

  return {
    initialCourse: course,
    authors: state.authors,
    courseId,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
export { container as default }