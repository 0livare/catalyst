import * as React from 'react'
import { shallow, mount, render } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { ManageCoursePage, ManageCoursePageProps } from './ManageCoursePage'
import { createCourseWithId } from '../../models'
import { courseActions } from '../../redux'

let authors = ['zach', 'kelsier', 'vin']
let course = createCourseWithId('1234')

let mockCourseActions: typeof courseActions = Object.assign({}, courseActions)
mockCourseActions.saveCourse = (c) => (d, g) =>  Promise.resolve()

function mountWithThemeProvider(component: React.ReactElement<any>) {
  let wrapped = <MuiThemeProvider>{component}</MuiThemeProvider>
  return mount(wrapped)
}

// let mockCourseActions: typeof courseActions = {
//   ...courseActions,
//   saveCourse: (c) => (d, g) =>  Promise.resolve(),
// }

describe ('Manage Course Page', () => {
  it('sets error message when trying to save empty title', () => {
    const props: ManageCoursePageProps  = {
      initialCourse: course,
      authors: [...authors.map(a => ({id: a}))],
      courseId: course.id,
      actions: mockCourseActions,
    }

    const wrapper = mountWithThemeProvider(<ManageCoursePage {...props}/>)
    const saveButton = wrapper.find('input').last()

    saveButton.prop('type').should.equal('submit')

    saveButton.simulate('click')
    //wrapper.state().errors.title.should.be('Title must be at least 5 characters.')
  })
})