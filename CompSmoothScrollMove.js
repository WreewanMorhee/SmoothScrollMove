const ScrollToMove = detectScrollY(
  forwardRef(({ scroll_y, turn_on = true, html }, BoxRef) => {
    if (!turn_on || window.innerWidth < 1024) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />
    }

    useEffect(() => {
      initial_moving_board(BoxRef)
      add_func_to_img(BoxRef)
    }, [])

    return (
      <div
        ref={BoxRef}
        style={{
          transform: `translateY(${-scroll_y}px)`
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  })
)

const initial_moving_board = BoxRef => {
  document.body.style.height = `${BoxRef.current.clientHeight}px`
  BoxRef.current.style.position = "fixed"
  BoxRef.current.style.top = 0
  BoxRef.current.style.left = 0
  BoxRef.current.style.transition = `transform .7s ease-out`
  BoxRef.current.style.width = "100%"
}

const add_func_to_img = BoxRef => {
  const img_list = Array.from(document.getElementsByTagName('img'))

  img_list.forEach((img) => {
    img.addEventListener('load', set_MB_height_to_body(BoxRef))
  })
}

const set_MB_height_to_body = BoxRef => () => {
  document.body.style.height = `${BoxRef.current.clientHeight}px`
}


import React, {
  useEffect,
  forwardRef
} from 'react'
import ReactDOM, { RawHTML } from 'react-dom'
import detectScrollY from './DetectScrollYVer2/DetectScrollY'
import { useWindowSize } from './WindowSizeContext'
import { init as initCompScrollMove } from './DetectScrollYForComp'

export const init = () => {
  initCompScrollMove()

  const target = document.getElementById('smooth-scroll-move')
  const html = target.innerHTML
  ReactDOM.render(<ScrollToMove html={html} />, target)
}
