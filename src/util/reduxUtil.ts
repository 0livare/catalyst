import { getFunctionArgNames } from 'src/util'
import memoizeOne from 'memoize-one'
import { RootThunkAction, RootDispatch, AppAction, RootState, RootAction } from 'src/redux'

/**
 * @param guard If guard() returns false or a string, a 'failure' will be
 * dispatched.  If it returns a string, an error will also be thrown because
 * currently the only reason to throw an error would be so that connectSubmitForm
 * can catch the error and prevent submission of the form.
 * @param begin A function that returns the appropriate 'begin' action
 * @param api The api method to execute to fetch data from the server.  The result
 * from this call will be given to the 'success' action if appropriate.
 * @param success A function that takes the fetched results and returns the
 * appropriate 'success' action
 * @param fail A function that returns the appropriate 'failure' action.  It can
 * optionally take an error string as a parameter.  This will be supplied if the api()
 * method throws an error or if the guard() returns a string.
 */
type ExecuteThunkParams<T> = {
  guard?: (s: RootState) => boolean | string,
  begin?: () => RootAction,
  api: (s: RootState) => Promise<T>,
  success?: (result: T) => RootAction,
  fail?: (reason?: string) => RootAction,
}

/**
 * A generic function for creating thunks of a standard form
 */
export function createThunk<T>(params: ExecuteThunkParams<T>): RootThunkAction<Promise<T>> {
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
      if (successRequiresParams) {
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

/**
 * Bind a single action creator so that invoking the returned function
 * will automatically dispatch the action to the store.
 * @param actionCreator A function that returns a RootAction
 * (synchronous action) or a RootThunkAction (async action)
 * @param dispatch A redux dispatch function whose store has had the
 * redux-thunk middleware installed so that it understands async actions
 * (thunks, functions) as well standard actions.
 */
export function bindActionCreator<T, Arg extends any>(
  actionCreator: (...args: Arg[]) => AppAction<T>,
  dispatch: RootDispatch,
): (...args: Arg[]) => T {
  // Wrap the action creator in a dispatch call so that when the
  // bound action creator is invoked, the resulting action is
  // automatically dispatched to the store
  let bound = (...args: Arg[]) => dispatch(actionCreator(...args) as any)
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
export function bindAndMemoizeActionCreator<T, Arg extends any>(
  actionCreator: (...args: Arg[]) => AppAction<T>,
  dispatch: RootDispatch,
): (...args: Arg[]) => T {
  // Memoize the bound action creator so that repeated calls with the
  // same arguments will be ignored
  return memoizeOne(bindActionCreator(actionCreator, dispatch))
}