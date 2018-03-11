import { AuthorAction } from './authors'
import { CourseAction } from './courses'

export type RootAction =
  | AuthorAction
  | CourseAction
  ;