export * from './authors'
export * from './courses'
export * from './ajax-status'
export * from './notifications'
export * from './store'

export * from './root-reducer'
export * from './root-state'
export * from './root-action'

export type OtherAction = { type: '' }
export const OtherAction: OtherAction = {type: ''}

import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {RootState} from './root-state'
import {RootAction} from './root-action'

/**
 * A thunk is an asynchronous action, which takes the form of a function that is
 * passed two arguments, the dispatch method to a store (which must understand
 * thunks, i.e. has had the `redux-thunk` middleware installed), and a function to
 * get the current state from that redux store.  Dispatching a thunk will return
 * the same object that is returned from the thunk itself, which (in this app)
 * must be a `Promise<T>`
 */
export type RootThunkAction<T> = ThunkAction<T, RootState, undefined, RootAction>
/* The only action type allowed to be dispatched in this app */
export type AppAction<T> = RootThunkAction<T> | RootAction

/**
 * A dispatch function from a store which has had the redux-thunk middleware installed
 * so that it understands both async actions (thunks) and standard synchronous actions
 */
export type RootDispatch = ThunkDispatch<RootState, undefined, RootAction>
// type AppDispatch<T> = (action: AppAction<T>) => T
