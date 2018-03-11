import {
  CourseAction,
  AuthorAction,
  AjaxStatusAction,
} from './'

export type RootAction =
  | AuthorAction
  | CourseAction
  | AjaxStatusAction