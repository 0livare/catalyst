import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { bindActionCreators } from 'redux'
import * as courseActions from '../../actions/courseActions'

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <h1>Manage Course</h1>
    )
  }
}

ManageCoursePage.propTypes = {
  // myProp: Propt/ypes.string.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    state: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)