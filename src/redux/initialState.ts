import { ICourse } from './courses'
import { IAuthor } from './authors'
import { RootState } from './RootState'

// Note that this class is an instance of type RootState
let initialState : RootState = {
  authors: [],
  courses: [],
}

export default initialState