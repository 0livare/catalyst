import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage  from './home/HomePage'
import AboutPage from './about/AboutPage'

class App extends React.Component {
  render() {
    return (
      <div style={{background: "yellow"}}>
        { this.props.children }

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route component={() => <h3>404 page not found</h3>} />
        </Switch>
      </div>
    )
  }
}

export default App;