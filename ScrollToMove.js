const App = ({html, turn_on}) => (
  <WindowScrollYProvider value={detectWindowScrollY()}>
    <FullPageScrollToMove turn_on={turn_on} html={html} />
  </WindowScrollYProvider>
)

import React from 'react'
import ReactDOM from 'react-dom'
import detectWindowScrollY, { WindowScrollYProvider } from './DetectScrollY/DetectWindowScrollY'
import FullPageScrollToMove from './FullPageScrollToMove'

export const init = ({full_page = true} = {}) => {
  const target = document.getElementById('smooth-scroll-move')
  const html = target ? target.innerHTML : ''

  ReactDOM.render(<App html={html} turn_on={full_page} />, target)
}
