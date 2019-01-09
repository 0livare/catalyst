import * as types from './types'
import {OptionsObject} from 'notistack'
import {OtherAction} from '..'

export type EnqueueSnackbarAction = {
    type: types.ENQUEUE_SNACKBAR,
    message: string,
    options?: OptionsObject,
  }

export function enqueueSnackbar(
  message: string,
  options?: OptionsObject,
): EnqueueSnackbarAction {
  return {
    type: types.ENQUEUE_SNACKBAR,
    message,
    options,
  }
}

export type RemoveSnackbarAction = {
  type: types.REMOVE_SNACKBAR,
  key: number,
}

export function removeSnackbar(key: number): RemoveSnackbarAction {
  return {
    type: types.REMOVE_SNACKBAR,
    key,
  }
}

//

export type NotificationAction =
  | OtherAction
  | EnqueueSnackbarAction
  | RemoveSnackbarAction