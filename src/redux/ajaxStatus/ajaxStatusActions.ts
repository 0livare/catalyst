import {OtherAction} from '../'
import {BEGIN_AJAX_CALL, AJAX_CALL_ERROR} from './types'

/*************************
 * ACTION TYPES/CREATORS
 *************************/

export type BeginAjaxCallAction = { type: BEGIN_AJAX_CALL }
export function beginAjaxCall(): BeginAjaxCallAction {
  return {type: BEGIN_AJAX_CALL}
}

export type AjaxCallErrorAction = { type: AJAX_CALL_ERROR }
export function ajaxCallError(): AjaxCallErrorAction {
  return {type: AJAX_CALL_ERROR}
}

/*************************
 * ACTION TYPE UNION
 *************************/

export type AjaxStatusAction =
  | BeginAjaxCallAction
  | AjaxCallErrorAction
  | OtherAction