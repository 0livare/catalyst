import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

function getErrorField(errors, param) {
  if (!errors) return
  return errors[param]
}

const CourseForm = ({course, allAuthors, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextField
        name="title"
        floatingLabelText="Title"
        value={course.title}
        onChange={onChange}
        errorText={getErrorField(errors, 'title')}
        fullWidth={true}
        />

      <SelectField
        name="authorId"
        floatingLabelText="Author"
        value={course.authorId}
        options={allAuthors}
        onChange={onChange}
        errorText={getErrorField(errors, 'authorId')}
        fullWidth={true}
        >

        {allAuthors.map((author, index) =>
          <MenuItem
            key={author}
            value={index}
            primaryText={author} />
        )}

      </SelectField>

      <TextField
        name="category"
        floatingLabelText="Category"
        value={course.category}
        onChange={onChange}
        errorText={getErrorField(errors, 'category')}
        fullWidth={true}
        />

      <TextField
        name="length"
        floatingLabelText="Length"
        value={course.length}
        onChange={onChange}
        errorText={getErrorField(errors, 'length')}
        fullWidth={true}
        />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  )
}

CourseForm.propTypes = {
  course:     PropTypes.object.isRequired,
  allAuthors: PropTypes.array,
  onSave:     PropTypes.func.isRequired,
  onChange:   PropTypes.func.isRequired,
  saving:     PropTypes.bool,
  errors:     PropTypes.object
}

export default CourseForm