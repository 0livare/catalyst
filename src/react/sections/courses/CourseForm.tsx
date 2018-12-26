import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import SelectField from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { InputLabel } from '@material-ui/core'
import * as cs from 'classnames'

import * as s from './CourseForm.scss'
import { ICourse, IAuthor } from 'src/models'

export interface ICourseFormProps {
  course: ICourse,
  allAuthors: IAuthor[],
  onSave: (e: React.MouseEvent<HTMLInputElement>) => void,
  onChangeText: (e: any) => void,
  onChangeAuthor: (
    e: React.ChangeEvent<HTMLSelectElement>,
    child: React.ReactNode) => void,
  saving: boolean,
}

export const CourseForm: React.SFC<ICourseFormProps> = ({
  course, allAuthors, onSave,
  onChangeText, onChangeAuthor, saving}) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextField
        name='title'
        label='Title'
        onChange={onChangeText}
        value={course.title}
        fullWidth
      />

      <InputLabel htmlFor={'author'}>Author</InputLabel>
      <SelectField
        name='authorId'
        onChange={onChangeAuthor}
        fullWidth
        inputProps={{name: 'author', id: 'author'}}
      >
        <MenuItem
          value={0}
          id='course-form-authors'
        >
          Select an author
        </MenuItem>

        {allAuthors.map(author =>
          <MenuItem
            key={author.id}
            value={author.id}
          >
            {author.id}
          </MenuItem>,
        )}
      </SelectField>

      <TextField
        name='category'
        label='Category'
        value={course.category}
        onChange={onChangeText}
        fullWidth
      />

      <TextField
        name='length'
        label='Length'
        value={course.length}
        onChange={onChangeText}
        fullWidth
      />

      <input
        type='submit'
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className={cs('btn', 'btn-primary', s.submit)}
        onClick={onSave}
      />
    </form>
  )
}