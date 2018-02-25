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
        allAuthors={this.props.authors}
        />
    )
  }
}

ManageCoursePage.propTypes = {
  initialCourse: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
}

function mapStateToProps(state, ownProps) {
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}

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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)