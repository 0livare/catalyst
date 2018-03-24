import * as React from 'react'
import { mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export function mountWithThemeProvider(component: React.ReactElement<any>) {
  const wrapped = <MuiThemeProvider>{component}</MuiThemeProvider>
  return mount(wrapped)
}