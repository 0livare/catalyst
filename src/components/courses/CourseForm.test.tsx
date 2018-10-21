import * as React from 'react'
import { shallow, mount, render } from 'enzyme'

import { CourseForm, ICourseFormProps } from './CourseForm'
import { Course } from '../../models'

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
  };

  return shallow(<CourseForm {...props} />);
}

describe('CourseForm', () => {
  it('renders form and h1', () => {
    const wrapper = setup()
    wrapper.find('form').should.have.lengthOf(1)
    wrapper.find('h1').text().should.equal('Manage Course')
  })

  describe('Save button', () => {
    it('is labeled "Save" when not saving', () => {
      const wrapper = setup(false)
      wrapper.find('input').props().value.should.equal('Save')
    })

    it('is labeled "Saving..." when saving', () => {
      const wrapper = setup(true)
      wrapper.find('input').props().value.should.equal('Saving...')
    })
  })

  it('should display all authors', () => {
    const wrapper = setup()

    for (const author of authors) {
      const selector = `[value="${author}"]`
      wrapper.find(selector).should.have.length(1)
    }
  })
})