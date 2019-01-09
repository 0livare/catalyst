import memoizeOne from 'memoize-one'
import {getFunctionArgNames} from '.'
import {
  RootState,
  RootAction,
  RootThunkAction,
  AppAction,
  RootDispatch,
} from 'src/redux'

/**
 * Bind a single action creator so that invoking the returned function
 * will automatically dispatch the action to the store.
 * @param actionCreator A function that returns a RootAction
 * (synchronous action) or a RootThunkAction (async action)
 * @param dispatch A redux dispatch function whose store has had the
 * redux-thunk middleware installed so that it understands async actions
 * (thunks, functions) as well standard actions.
 */
export function bindActionCreator<T, Arg1>(
  actionCreator: (arg: Arg1) => AppAction<T>,
  dispatch: RootDispatch,
): (arg1: Arg1) => T
export function bindActionCreator<T, Arg1, Arg2>(
  actionCreator: (arg1: Arg1, arg2: Arg2) => AppAction<T>,
  dispatch: RootDispatch,
): (arg1: Arg1, arg2: Arg2) => T
export function bindActionCreator<T, Arg1, Arg2, Arg3>(
  actionCreator: (arg1: Arg1, arg2: Arg2, arg3: Arg3) => AppAction<T>,
  dispatch: RootDispatch,
): (arg1: Arg1, arg2: Arg2, arg3: Arg3) => T
export function bindActionCreator<T, Arg1, Arg2, Arg3, Arg4, Arg5>(
  actionCreator: (arg1?: Arg1, arg2?: Arg2, arg3?: Arg3, arg4?: Arg4, arg5?: Arg5) => AppAction<T>,
  dispatch: RootDispatch,
): (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => T
export function bindActionCreator<T>(
  actionCreator: (...args: any[]) => AppAction<T>,
  dispatch: RootDispatch,
): (...args: any[]) => T
{
  // Wrap the action creator in a dispatch call so that when the
  // bound action creator is invoked, the resulting action is
  // automatically dispatched to the store
  let bound = (...args: any[]) => dispatch(actionCreator(...args) as any)
  return bound
}

/**
 * Bind and memoize a single action creator so that invoking the
 * returned function will automatically dispatch the action to the
 * store, and ignore repeated calls with the same arguments
 * @param actionCreator A function that returns a RootAction
 * (synchronous action) or a RootThunkAction (async action)
 * @param dispatch A redux dispatch function whose store has had the
 * redux-thunk middleware installed so that it understands async actions
 * (thunks, functions) as well standard actions.
 */
export function bindAndMemoizeActionCreator<T, Arg1>(
  actionCreator: (arg: Arg1) => AppAction<T>,
  dispatch: RootDispatch,
): (arg1: Arg1) => T
export function bindAndMemoizeActionCreator<T, Arg1, Arg2>(
  actionCreator: (arg1: Arg1, arg2: Arg2) => AppAction<T>,
  dispatch: RootDispatch,
): (arg1: Arg1, arg2: Arg2) => T
export function bindAndMemoizeActionCreator<T, Arg1, Arg2, Arg3>(
  actionCreator: (arg1: Arg1, arg2: Arg2, arg3: Arg3) => AppAction<T>,
  dispatch: RootDispatch,
): (arg1: Arg1, arg2: Arg2, arg3: Arg3) => T
export function bindAndMemoizeActionCreator<T>(
  actionCreator: (...args: any[]) => AppAction<T>,
  dispatch: RootDispatch,
): (...args: any[]) => T {
  // Memoize the bound action creator so that repeated calls with the
  // same arguments will be ignored
  return memoizeOne(bindActionCreator(actionCreator as any, dispatch) as any)
}

type CreateThunkParams<T> = {
  /**
   * @param guard If guard() returns `false` or a string, a 'failure' will be
   * dispatched.  If it returns a string, an error will also be thrown because
   * currently the only reason to throw an error would be so that `connectSubmitForm`
   * can catch the error and prevent submission of the form.  If it returns anything
   * other than `false` or a string, the `api()` function will be dispatched.
   */
  guard?: (s: RootState) => boolean | string,
  /** @param begin A function that returns the appropriate 'begin' action */
  begin?: () => RootAction,
  /** @param api The api method to execute to fetch data from the server.  The result
   * from this call will be given to the 'success' action if appropriate.
   */
  api: (s: RootState) => Promise<T>,
  /**
   * @param success A function that takes the fetched results and returns the
   * appropriate 'success' action
   */
  success?: (result: T) => RootAction,
  /**
   * @param fail A function that returns the appropriate 'failure' action.  It can
   * optionally take an error string as a parameter.  This will be supplied if the api()
   * method throws an error or if the guard() returns a string.
   */
  fail?: (reason?: string) => RootAction,
  /**
   * A flag to indicate whether the current value should be cleared while the new one
   * is being requested.  This will be accomplished via a dispatch of a success(null)
   */
  clearCurrentValue?: boolean,
}

/**
 * A generic function for creating thunks of a standard form
 */
export function createThunk<T>(params: CreateThunkParams<T>): RootThunkAction<Promise<T>> {
  return async (dispatch, getState) => {
    const {guard, begin, api, success, fail} = params
    const state = getState()

    try {
      if (guard) {
        let guardResult = guard(state)
        let guardReturnedString = typeof guardResult === 'string'
        let guardFailed = guardResult === false || guardReturnedString

        if (guardFailed) {
          if (begin) dispatch(begin())

          if (guardReturnedString) {
            // `catch` clause below dispatches fail
            throw new Error(guardResult as string)
          } else {
            if (fail) dispatch(fail())
            return
          }
        }
      }

      let successRequiresParams = getFunctionArgNames(success).length > 0
      if (successRequiresParams && params.clearCurrentValue) {
        // If the success function takes any arguments, meaning that it
        // receives data instead of just marking success, clear the current
        // data before fetching the  new stuff
        if (begin) dispatch(begin())
        if (success) dispatch(success(null))
      }

      if (begin) dispatch(begin())

      const result = await api(state)
      if (!result && successRequiresParams) {
        if (fail) dispatch(fail())
        return
      }

      if (success) dispatch(success(result))
      return result
    } catch (e) {
      if (fail) dispatch(fail(e.message))
      throw e
    }
  }
}