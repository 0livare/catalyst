import { ThunkResult } from '../'
import authorApi from '../../api/authorApi'
import { OtherAction } from '../'
import { BEGIN_AJAX_CALL } from './types'

/*************************
 * ACTION TYPES/CREATORS
 *************************/

export type BeginAjaxCallAction = { type: BEGIN_AJAX_CALL }
export function beginAjaxCall(): BeginAjaxCallAction {
  return { type: BEGIN_AJAX_CALL }
}

/*************************
 * ACTION TYPE UNION
 *************************/

export type AjaxStatusAction =
  | BeginAjaxCallAction
  | OtherAction