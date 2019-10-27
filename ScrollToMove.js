const App = ({html, comp_list}) => (
  <WindowScrollYProvider value={detectWindowScrollY()}>
    <FullPageScrollToMove html={html} />

    {/*{comp_list.map((comp, index) => (
      <CompScrollToMoveConnector key={`key-${index + 1}`} target_DOM={comp} />
    ))}*/}
  </WindowScrollYProvider>
)

import React from 'react'
import ReactDOM from 'react-dom'
import detectWindowScrollY, { WindowScrollYProvider } from './DetectScrollY/DetectWindowScrollY'
import FullPageScrollToMove from './FullPageScrollToMove'
import CompScrollToMoveConnector from './CompScrollToMove'

export const init = () => {
  const target = document.getElementById('smooth-scroll-move')
  const html = target ? target.innerHTML : ''

  // const comp_list = Array.from(
  //   document.getElementsByClassName("smc")
  // )

  ReactDOM.render(<App html={html} />, target)
}
