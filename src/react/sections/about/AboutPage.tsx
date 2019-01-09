import * as React from 'react'
import {Typography} from '@material-ui/core'

export const AboutPage: React.SFC<{}> = () => {
  return (
    <div>
      <Typography variant='h1'>About</Typography>
      <Typography variant='body1'>
        This application uses React, Redux, React Router and a variety of other helpful libraries.
      </Typography>
    </div>
  )
}