import * as React from 'src/react/layout/snackbar/node_modules/react'
import {connect} from 'src/react/layout/snackbar/node_modules/react-redux'

import {ICourse, IAuthor, createCourseWithId} from 'src/models'
import {RootState, RootDispatch, loadCourses, saveCourse} from 'src/redux'
import {CourseForm} from './components/CourseForm'
import {bindActionCreator} from 'src/util/reduxUtil'
import {IReactRouterProps} from 'src/util/reactRouterUtil'
import {connectSubmitForm, InjectedSubmitFormProps, GO_BACK_URL} from 'src/react/components/connectSubmitForm'

interface IMatchParams { courseId: string }

export type IEditCoursePageProps =
  & IReactRouterProps<IMatchParams>
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>
  & InjectedSubmitFormProps<ICourse>
  & {
    initialCourse?: ICourse,  // Not required when adding a new course
    authors: IAuthor[],
  }

export interface IEditCoursePageState {
  course: ICourse,
  errors: object,
  saving: boolean,
}

type NamedTarget = {target: {name: string, value: any}}

export class EditCoursePage extends React.Component<IEditCoursePageProps, IEditCoursePageState> {
  constructor(props: IEditCoursePageProps) {
    super(props)

    const initialCourse = props.initialCourse
      || createCourseWithId(this.props.courseId)

    this.state = {
      course: Object.assign({}, initialCourse),
      errors: {},
      saving: false,
    }
  }

  public updateCourseState = (event: NamedTarget) => {
    const field = event.target.name
    const course = Object.assign({}, this.state.course)

    // @ts-ignore
    course[field] = event.target.value

    return this.setState({course})
  }

  private updateCourseAuthor = (
    event: React.ChangeEvent<HTMLSelectElement>,
    child: React.ReactNode,
  ) => {
    const course = Object.assign({}, this.state.course)

    course.authorId = event.target.value
    return this.setState({course})
  }

  private saveCourse = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault()

    this.props.submit(
      GO_BACK_URL,
      this.props.actions.saveCourse(this.state.course),
    )
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

  public componentDidUpdate() {
    if (this.props.courseId !== this.state.course.id) {
      this.setState({course: this.props.initialCourse})
    }
  }
}

function mapStateToProps(state: RootState, ownProps: any) {
  const courseId = ownProps.match.params.courseId

  let course = null
  for (const c of state.courseState.courses) {
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

function mapDispatchToProps(dispatch: RootDispatch) {
  // Binding action creators individually results in correct
  // static typing of this method, whereas using Redux.bindActionCreators
  // does not.
  return {actions: {
    loadCourses: bindActionCreator(loadCourses, dispatch),
    saveCourse: bindActionCreator(saveCourse, dispatch),
  }}
}

const container = connect(mapStateToProps, mapDispatchToProps)(EditCoursePage)
const submit = connectSubmitForm()(container)

export {submit as default}