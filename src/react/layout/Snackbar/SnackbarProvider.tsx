import {SnackbarProvider, SnackbarProviderProps} from 'notistack'
import {compose, withProps} from 'recompose'
import {CSSProperties} from '@material-ui/core/styles/withStyles'
import {Theme, createStyles, WithStyles, withStyles} from '@material-ui/core'

// See the notistack docs here: https://iamhosseindhv.com/notistack

const fontSize: CSSProperties = {fontSize: '1.6rem'}
const styles = (theme: Theme) => createStyles({
  variantSuccess: fontSize,
  variantError:   fontSize,
  variantWarning: fontSize,
  variantInfo:    fontSize,
})

type SnackProps =
  & SnackbarProviderProps
  & WithStyles<typeof styles>

const props = {
  maxSnack: 3,
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
} as SnackProps

const Snackbar = compose(withProps(props))(SnackbarProvider)
const StyledSnackbar = withStyles(styles)(Snackbar)

export {StyledSnackbar as SnackbarProvider}