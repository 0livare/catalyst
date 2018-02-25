import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as courseActions from '../../actions/courseActions'
import CourseList from './CourseList'

class CoursesPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { courses } = this.props

    return (
      <CourseList courses={courses} />
     )
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    courses: state.courses,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)