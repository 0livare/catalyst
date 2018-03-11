import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import LinearProgress from 'material-ui/LinearProgress'
import * as cs from 'classnames'

import * as s from './Nav.scss'

export interface NavProps {
  loading: boolean,
}

export const Navigation : React.SFC<NavProps> = ({loading}) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink
            exact to="/">
              React Starter Kit
          </NavLink>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/" activeClassName={s.active}>
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/courses" activeClassName={s.active}>
          <NavItem>Courses</NavItem>
        </LinkContainer>
        <LinkContainer to="/about" activeClassName={s.active}>
          <NavItem>About</NavItem>
        </LinkContainer>
      </Nav>

      { loading && <LinearProgress mode="indeterminate" /> }
    </Navbar>
  )
}