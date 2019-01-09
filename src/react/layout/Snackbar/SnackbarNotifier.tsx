import * as React from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {RootState} from 'src/redux'
import {InjectedNotistackProps, withSnackbar} from 'notistack'
import {bindActionCreators} from 'redux'
import {enqueueSnackbar, removeSnackbar} from 'src/redux/notifications/actions'

// The props that this page will receive, a combination of the redux state
// and the redux dispatch props
export type ISnackbarNotifierProps =
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>
  & InjectedNotistackProps

// State that this page manages
export type IState = {
  displayedNotificationKeys: number[],
}

export class SnackbarNotifier extends React.Component<ISnackbarNotifierProps, IState> {
  constructor(props: ISnackbarNotifierProps) {
    super(props)
    this.state = {
      displayedNotificationKeys: [],
    }
  }

  private storeDisplayed = (key: number) => {
    this.setState(state => {
      let displayed = state.displayedNotificationKeys
      let augmented = [...displayed, key]

      return {displayedNotificationKeys: augmented}
    })
  }

  public render(): null {
    let {displayedNotificationKeys} = this.state

    // Remove notifications from state
    this.props.notifications.forEach((notification) => {
      setTimeout(() => {
          // If notification already displayed, abort
          if (displayedNotificationKeys.indexOf(notification.key) > -1) return

          // Display notification using notistack
          this.props.enqueueSnackbar(notification.message, notification.options)

          // Add notification's key to the local state
          this.storeDisplayed(notification.key)

          // Dispatch action to remove the notification from the redux store
          this.props.removeSnackbarAction(notification.key)
      }, 1)
    })

    return null
  }
}

function mapStateToProps(state: RootState, ownProps: any) {
  return {
    notifications: state.notifications,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  let actions = {
    enqueueSnackbarAction: enqueueSnackbar,
    removeSnackbarAction: removeSnackbar,
  }
  return bindActionCreators(actions, dispatch)
}

// Connect the CreateAssignment page to the redux store
const container = connect(mapStateToProps, mapDispatchToProps)(SnackbarNotifier)
const snacks = withSnackbar(container)

export {snacks as default}