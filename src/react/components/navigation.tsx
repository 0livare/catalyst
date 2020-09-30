import * as React from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import LinearProgress from '@material-ui/core/LinearProgress'
import {Typography} from '@material-ui/core'

import * as s from './Navigation.scss'

export interface INavProps {
  loading: boolean,
}

export const Navigation: React.SFC<INavProps> = ({loading}) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink
            exact
            to='/'
          >
            <Typography variant='h5'>
              Catalyst
            </Typography>
          </NavLink>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to='/' activeClassName={s.active}>
          <NavItem><Typography variant='body1'>Home</Typography></NavItem>
        </LinkContainer>
        <LinkContainer to='/courses' activeClassName={s.active}>
          <NavItem><Typography variant='body1'>Courses</Typography></NavItem>
        </LinkContainer>
        <LinkContainer to='/about' activeClassName={s.active}>
          <NavItem><Typography variant='body1'>About</Typography></NavItem>
        </LinkContainer>
      </Nav>

      {loading && <LinearProgress />}
    </Navbar>
  )
}