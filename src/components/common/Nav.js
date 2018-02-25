import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Nav.scss'

const Nav = () => {
  return (
    <nav className={s.nav}>
      <NavLink exact to="/" activeClassName={s.active}>Home</NavLink>
      {" | "}
      <NavLink to="/courses" activeClassName={s.active}>Courses</NavLink>
      {" | "}
      <NavLink to="/about" activeClassName={s.active}>About</NavLink>
    </nav>
  )
}

export default Nav;