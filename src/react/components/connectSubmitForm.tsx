import * as React from 'react'
import {IReactRouterProps} from 'src/util/reactRouterUtil'

/** The state that this HOC maintains */
type IComposedSubmitFormState = {
  isSubmitted: boolean,
  error: Error,
  redirectPath: string,
}

/**
 * The props that will be passed to the form that the
 * connectSubmitForm HOC renders
 * @param T The eventual return type of the thunkAction
 */
export type InjectedSubmitFormProps<T> =
  & IComposedSubmitFormState
  & {
  /**
   * Calling this function will attempt to submit the form by
   * dispatching the passed action
   */
  submit: (
    getRedirectPath: string | TReturnString<T>,
    dispatchedAction: Promise<T>,
  ) => void,
}

type TReturnString<T> = (t: T) => string

/**
 * If this string is passed as the `getRedirectPath` argument to the
 * `submit()` function, instead of navigating forward to some new page
 * on save, the user will be navigated to the previous page in the
 * browser history.
 */
export const GO_BACK_URL = 'GO_BACK'

/**
 * A Higher Order Component (HOC) that keeps track of when a "form" is
 * submitted, waits for the result of that submission, and redirects
 * to another page (via react-router) if the result of the submission
 * is successful
 *
 * This was adopted from the discussion here:
 * https://github.com/reduxjs/redux/issues/297
 *
 */
export function connectSubmitForm<T>() {
  return (Form: any) => class ComposedSubmitForm extends
    React.Component<IReactRouterProps, IComposedSubmitFormState>
  {
    constructor(props: IReactRouterProps) {
      super(props)
      this.state = {
        isSubmitted: false,
        error: null,
        redirectPath: null,
      }
    }

    private submit = async (
      getRedirectPath: string | TReturnString<T>,
      dispatchedAction: Promise<T>,
    ) => {
      try {
        this.setState({isSubmitted: true})
        let result: T = await dispatchedAction

        let redirectPath = typeof getRedirectPath === 'string'
          ? getRedirectPath as string
          : getRedirectPath(result)

        this.setState({redirectPath})
      } catch (error) {
        let e = error || 'Promise rejected'
        this.setState({error: e, isSubmitted: false})
      }
    }

    public render() {
      let injectedProps: InjectedSubmitFormProps<T> = {
        submit: this.submit,
        isSubmitted: this.state.isSubmitted,
        error: this.state.error,
        redirectPath: this.state.redirectPath,
      }

      return (
        <Form
          {...this.props}
          {...injectedProps}
        />
      )
    }

    public componentDidMount() {
      this.tryRedirect()
    }

    public componentDidUpdate() {
      this.tryRedirect()
    }

    private tryRedirect() {
      let path = this.state.redirectPath
      if (!path) return

      if (path === GO_BACK_URL) {
        this.props.history.goBack()
      } else {
        this.props.history.push(path)
      }
    }
  }
}