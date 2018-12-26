import * as types from './types'
import { InitialState } from '../rootState'
import { AjaxStatusAction } from '../'

/*
 * This reducer establishes a convention: That after every
 * asynchronous call to the API, a FOO_BAR_SUCCESS action will
 * be dispatched.  That is to say a success whose type has a
 * suffix of '_SUCCESS'.
 *
 * This convention allows us to manage the number of AJAX calls
 * in progress without having to make this reducer know (and be
 * constantly updated with) each kind of SUCCESS message that the
 * app contains.
 *
 * It's important to note again here that every reducer processes
 * _every_ action.  So no matter what kind of action is dispatched,
 * this reducer will always be able to process it.  And if that
 * action happens to end in '_SUCCESS', our convention allows us to
 * handle it accordingly.
 */

export function ajaxStatusReducer(
  state = InitialState.ajaxCallsInProgress,
  action: AjaxStatusAction)
{
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1
  } else if (isSuccessAction(action.type) || action.type === types.AJAX_CALL_ERROR) {
    return state - 1
  } else {
    return state
  }
}

function isSuccessAction(actionType: string): boolean {
  return actionType.toUpperCase().endsWith('_SUCCESS')
}