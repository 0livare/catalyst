import * as React from 'react'
import {Route, Switch} from 'react-router-dom'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {Grid, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'

import {RootState} from '../redux'
import {Navigation} from './components/Navigation'
import {HomePage} from './sections/home/HomePage'
import {AboutPage} from './sections/about/AboutPage'
import CoursesPage from './sections/courses/CoursesPage'

export interface IAppProps {
  loading: boolean,
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
       <div>
          <Navigation loading={this.props.loading} />

          <Grid>
            <Row>
              <Col xs={12}>
              <Switch>
                  <Route exact path='/'  component={HomePage} />
                  <Route path='/about'   component={AboutPage} />
                  <Route path='/courses' component={CoursesPage} />
                  <Route component={() => <h3>404 page not found</h3>} />
              </Switch>
              </Col>
            </Row>
        </Grid>
       </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state: RootState) {
  return {loading: state.ajaxCallsInProgress > 0}
}
const container = connect(mapStateToProps, null)(MasterPage)
export {container as App}