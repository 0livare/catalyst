import * as React from 'react'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {Grid, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'

import {RootState} from '../redux'
import {Navigation} from './components/Navigation'
import {RootRoutes} from './RootRoutes'

export interface IAppProps {
  isLoading: boolean,
}

class MasterPage extends React.Component<IAppProps, {}> {
  public render() {

    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
    })

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
const container = connect(mapStateToProps, null)(MasterPage)
export {container as App}