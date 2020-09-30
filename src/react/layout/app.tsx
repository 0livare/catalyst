import * as React from 'react'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {Grid, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'

import './globalStyles.scss'
import {RootState} from 'src/redux'
import {Navigation} from 'src/react/components/navigation'
import {RootRoutes} from './root-routes'

const colors = require('src/util/colors.scss')

export interface IAppProps {
  isLoading: boolean,
}

const theme = createMuiTheme({
  typography: {
  useNextVariants: true,
  // All MUI font-size's are set in rem units.  This value in pixels is used to
  // set the rems by assuming that the htmlFontSize is 16px.
  // e.g. With this set to 20, a button will get 1.25 rem because 20/16=1.25
  fontSize: 20,
  },
  palette: {
  primary: {
    main: colors.primary,
  },
  secondary: {
    main: colors.primaryLight,
  },
  },
})

class App extends React.Component<IAppProps, {}> {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
       <>
        <Navigation loading={this.props.isLoading} />
        <Grid>
          <Row>
            <Col xs={12}>
              <RootRoutes />
            </Col>
          </Row>
        </Grid>
       </>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state: RootState) {
  return {isLoading: state.ajaxCallsInProgress > 0}
}
const container = connect(mapStateToProps, null)(App)
export {container as App}