import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { bindActionCreators } from 'redux'

import * as courseActions from '../../actions/courseActions'
import CourseForm from './CourseForm'

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      course: Object.assign({}, props.initialCourse),
      errors: {},
    }
  }

  render() {
    return (
      <CourseForm
        course={this.state.course}
        errors={this.state.errors}
        allAuthors={['zach', 'posten']}
        />
    )
  }
}

ManageCoursePage.propTypes = {
  initialCourse: PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}

  return { initialCourse: course }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)