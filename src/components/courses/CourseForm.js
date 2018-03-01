import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import cs from 'classnames'

import s from './CourseForm.scss'

function getErrorField(errors, param) {
  if (!errors) return
  return errors[param]
}

const CourseForm = ({
  course, allAuthors, onSave,
  onChangeText, onChangeAuthor, saving, errors}) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextField
        name="title"
        floatingLabelText="Title"
        value={course.title}
        onChange={onChangeText}
        errorText={getErrorField(errors, 'title')}
        fullWidth
        />

      <SelectField
        name="authorId"
        floatingLabelText="Author"
        value={course.authorId}
        options={allAuthors}
        onChange={onChangeAuthor}
        errorText={getErrorField(errors, 'authorId')}
        fullWidth
        >

        <MenuItem
          value={0}
          primaryText="Select an author" />

        {allAuthors.map(author =>
          <MenuItem
            key={author.id}
            value={author.id}
            primaryText={author.name} />
        )}

      </SelectField>

      <TextField
        name="category"
        floatingLabelText="Category"
        value={course.category}
        onChange={onChangeText}
        errorText={getErrorField(errors, 'category')}
        fullWidth
        />

      <TextField
        name="length"
        floatingLabelText="Length"
        value={course.length}
        onChange={onChangeText}
        errorText={getErrorField(errors, 'length')}
        fullWidth
        />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className={cs('btn', 'btn-primary', s.submit)}
        onClick={onSave}/>
    </form>
  )
}

CourseForm.propTypes = {
  course:         PropTypes.object.isRequired,
  allAuthors:     PropTypes.array,
  onSave:         PropTypes.func.isRequired,
  onChangeText:   PropTypes.func.isRequired,
  onChangeAuthor: PropTypes.func.isRequired,
  saving:         PropTypes.bool,
  errors:         PropTypes.object,
}

export default CourseForm