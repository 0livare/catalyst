import React from 'react'
import cs from 'classnames'
import { Jumbotron, Button } from 'react-bootstrap'
import s from './HomePage.scss'

class HomePage extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1>This is your home page!</h1>
        <p>
          Ready to learn React and Redux?  Run 'git log' to read
          through this repo and understand how it was built!
        </p>
        <p>
          <a href="https://github.com/zposten/react-starter-kit/commits/master">
            <Button bsStyle="primary">Learn more</Button>
          </a>
        </p>
      </Jumbotron>
    )
  }
}

export default HomePage