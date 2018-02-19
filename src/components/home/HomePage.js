import React from 'react'
import { NavLink } from 'react-router-dom'

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Home</h1>
        <NavLink to="about" className="btn btn-primary">
          About
        </NavLink>
      </div>
    )
  }
}

export default HomePage