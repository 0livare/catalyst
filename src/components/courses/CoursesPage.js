import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'

import * as courseActions from '../../actions/courseActions'
import CourseList from './CourseList'
import ManageCoursePage from './ManageCoursePage'

class CoursesPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { courses, match } = this.props

    return (
      <Switch>
        <Route
          exact path={match.path}
          render={() => <CourseList courses={courses} />} />
        <Route
          exact path={`${match.path}/:courseId`}
          component={ManageCoursePage} />
      </Switch>

     )
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired, // Supplied by react router
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