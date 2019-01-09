import * as React from 'react'
import * as s from './FourOhFourPage.scss'

const BackLink = (props: {children: any}) => (
  <a href='javascript:history.back()'>{...props.children}</a>
)

export const FourOhFourPage = () => {
  return (
    <div className={s.wrapper}>
      <img
        src='/images/urkle.gif'
        alt='404 not found'
        width={800}
        height={600}
      />
    </div>
  )
}