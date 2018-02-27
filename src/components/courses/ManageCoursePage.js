import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { bindActionCreators } from 'redux'

import * as courseActions from '../../actions/courseActions'
import CourseForm from './CourseForm'

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context)

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

  updateCourseState(event) {
    const field = event.target.name
    let course = Object.assign({}, this.state.course)
    course[field] = event.target.value

    return this.setState({course})
  }

  updateCourseAuthor(event, key, payload) {
    let course = Object.assign({}, this.state.course)
    course.authorId = payload
    return this.setState({course})
  }

  saveCourse(event) {
    event.preventDefault()
    this.props.actions.saveCourse(this.state.course)
    this.props.history.goBack()
  }

  render() {
    return (
      <CourseForm
        course={this.state.course}
        errors={this.state.errors}
        allAuthors={this.props.authors}
        onChangeText={this.updateCourseState}
        onChangeAuthor={this.updateCourseAuthor}
        onSave={this.saveCourse}
        />
    )
  }
}

ManageCoursePage.propTypes = {
  initialCourse: PropTypes.object, // Not required when adding a new course
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {
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
    name: author.id,
  }))

  return {
    initialCourse: course,
    authors: authorsFormattedForDropdown,
    courseId: courseId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)