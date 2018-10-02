import * as React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import * as cs from 'classnames'
import { ICourse, IAuthor } from '../../models'
import * as s from './CourseForm.scss'

export interface ICourseFormProps {
  course: ICourse,
  allAuthors: IAuthor[],
  onSave: (e: React.MouseEvent<HTMLInputElement>) => void,
  onChangeText: (e: any) => void,
  onChangeAuthor: (
    e: React.FormEvent<HTMLSelectElement>,
    index: number,
    payload: string) => void,
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
        floatingLabelText='Title'
        onChange={onChangeText}
        value={course.title}
        fullWidth
      />

      <SelectField
        name='authorId'
        floatingLabelText='Author'
        value={course.authorId}
        onChange={onChangeAuthor}
        fullWidth
      >
        <MenuItem
          value={0}
          id='course-form-authors'
          primaryText='Select an author'
        />
        {allAuthors.map(author =>
          <MenuItem
            key={author.id}
            value={author.id}
            primaryText={author.id}
          />,
        )}
      </SelectField>

      <TextField
        name='category'
        floatingLabelText='Category'
        value={course.category}
        onChange={onChangeText}
        fullWidth
      />

      <TextField
        name='length'
        floatingLabelText='Length'
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