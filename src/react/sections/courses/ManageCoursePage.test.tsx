import * as React from 'react'
import {mount} from 'enzyme'

import {ManageCoursePage, IManageCoursePageProps} from './ManageCoursePage'
import {createCourseWithId, ICourse} from 'src/models'

const authors = ['zach', 'kelsier', 'vin']
const course = createCourseWithId('1234')

let mockCourseActions = {
  saveCourse: (c: ICourse) => Promise.resolve(c),
  loadCourses: () => Promise.resolve([] as ICourse[]),
}

describe ('Manage Course Page', () => {
  it('sets error message when trying to save empty title', () => {
    const props: IManageCoursePageProps  = {
      initialCourse: course,
      authors: [...authors.map(a => ({id: a}))],
      courseId: course.id,
      actions: mockCourseActions,
      history: null,
      location: null,
      match: null,
    }

    const wrapper = mount(<ManageCoursePage {...props}/>)
    const saveButton = wrapper.find('input').last()

    expect(saveButton.prop('type')).toBe('submit')
    saveButton.simulate('click')
    // wrapper.state().errors.title.should.be('Title must be at least 5 characters.')
  })
})