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
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this)
  }

  redirectToAddCoursePage() {
    // To be consistent with the schema, this should be a guid.
    // But I don't want to add another dependency just for that
    // when we're working with mock data here anyway.
    var crappyId = Math.floor(Math.random() * 999999999)

    // 'history' is supplied through the react context
    // by react-router, which basically means that it
    // will automatically be in the props of every
    // component
    this.props.history.push(`/courses/${crappyId}`)
  }

  render() {
    const { courses, match } = this.props

    const courseList =
      <CourseList
        courses={courses}
        redirectToAddCoursePage={this.redirectToAddCoursePage}/>

    return (
      <Switch>
        <Route
          exact path={match.path}
          render={() => courseList} />
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
  let courses = [...state.courses]
  courses.sort((a, b) => a.title.localeCompare(b.title))

  return { courses }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)