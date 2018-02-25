import React from 'react'
import s from './HomePage.scss'
import cs from 'classnames'

class HomePage extends React.Component {
  render() {
    return (
      <div className={cs(s.zach, s.posten)}>
        <h1 className={s.title}>Home</h1>
      </div>
    )
  }
}

export default HomePage