import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

import { RootState }  from '../redux'
import { Navigation } from './common/Navigation'
import { HomePage }   from './home/HomePage'
import { AboutPage }  from './about/AboutPage'
import CoursesPage    from './courses/CoursesPage'

export interface AppProps {
  loading: boolean,
}

class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
       <div>
          <Navigation loading={this.props.loading} />

          <Grid>
            <Row>
              <Col xs={12}>
                <Switch>
                  <Route exact path="/"  component={HomePage} />
                  <Route path="/about"   component={AboutPage} />
                  <Route path="/courses" component={CoursesPage} />
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
  return { loading: state.ajaxCallsInProgress > 0 }
}
const container = connect(mapStateToProps, null)(App)
export { container as App }