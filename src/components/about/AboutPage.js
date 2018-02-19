import React from 'react'
import { NavLink } from 'react-router-dom'

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This application uses React, Redux, React Router and a variety of other helpful libraries.</p>

        <NavLink to="/">Back home</NavLink>
      </div>
    )
  }
}

export default AboutPage