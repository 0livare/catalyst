import * as React from 'src/react/layout/snackbar/node_modules/react'
import {Typography} from 'src/react/layout/snackbar/node_modules/@material-ui/core'

import * as s from './AboutPage.scss'

export const AboutPage: React.SFC<{}> = () => {
  return (
    <div>
      <Typography variant='h2' className={s.title}>About</Typography>
      <Typography variant='body1'>
        This application uses React, Redux, React Router and a variety of other helpful libraries.
      </Typography>
    </div>
  )
}