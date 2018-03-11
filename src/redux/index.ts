export * from './authors'
export * from './courses'
export * from './ajaxStatus'
export * from './store/configureStore'

export * from './rootReducer'
export * from './rootState'
export * from './initialState'
export * from './rootAction'

export type OtherAction = { type: '' };
export const OtherAction : OtherAction = { type: '' };

import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from './rootState'
import { RootAction } from './rootAction'
/**
 * A type for specifying the eventual return type of
 * any Thunk.  `T` is the eventual return type of
 * the thunk.
 */
export type ThunkResult<T> = ThunkAction<Promise<T>, RootState, undefined, RootAction>