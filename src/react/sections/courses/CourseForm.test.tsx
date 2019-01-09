import * as React from 'react'
import {shallow} from 'enzyme'

import {CourseForm, ICourseFormProps} from './CourseForm'
import {Course} from 'src/models'

/* tslint:disable:no-empty */

const authors = ['zach', 'kalidin', 'kvothe']

function setup(saving: boolean = false) {
  const props: ICourseFormProps = {
    course: Course,
    allAuthors: [...authors.map(a => ({id: a}))],
    onSave: (e) => {},
    onChangeText: (e) => {},
    onChangeAuthor: (e, n) => {},
    saving,
  }

  return shallow(<CourseForm {...props} />)
}

describe('CourseForm', () => {
  test('renders form and h1', () => {
    const wrapper = setup()
    expect(wrapper.find('form')).toHaveLength(1)
    expect(wrapper.find('h1').text()).toBe('Manage Course')
  })

  describe('Save button', () => {
    test('is labeled "Save" when not saving', () => {
      const wrapper = setup(false)
      let val = wrapper.find('input').props().value
      expect(val).toBe('Save')
    })

    test('is labeled "Saving..." when saving', () => {
      const wrapper = setup(true)
      let val = wrapper.find('input').props().value
      expect(val).toBe('Saving...')
    })
  })

  test('should display all authors', () => {
    const wrapper = setup()

    for (const author of authors) {
      const selector = `[value="${author}"]`
      expect(wrapper.find(selector)).toHaveLength(1)
    }
  })
})