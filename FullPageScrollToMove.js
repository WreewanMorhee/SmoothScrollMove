const FullPageScrollToMove = ({ turn_on = true, html }) => {
  const BoxRef = useRef(null)
  const scroll_y = useContext(WindowScrollYContext)
  const [can_render_comp, set_can_render_comp] = useState(false)

  useEffect(() => {
    initial_moving_board(BoxRef)
    add_func_to_img(BoxRef)
    set_can_render_comp(true)
  }, [])

  if (!turn_on || window.innerWidth < 1024) {
    const comp_list = Array.from(
      document.getElementsByClassName("smc")
    )

    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {can_render_comp && comp_list.map((comp, index) => (
          <CompScrollToMoveConnector key={`key-${index + 1}`} target_DOM={comp} />
        ))}
      </>
    )
  }

  const comp_list = Array.from(
    document.getElementsByClassName("smc")
  )

  return (
    <>
    <div
      ref={BoxRef}
      style={{
        transform: `translateY(${-scroll_y}px)`
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
    {can_render_comp && comp_list.map((comp, index) => (
      <CompScrollToMoveConnector key={`key-${index + 1}`} target_DOM={comp} />
    ))}
    </>
  )
}


const initial_moving_board = BoxRef => {
  if (!BoxRef.current) return

  document.body.style.height = `${BoxRef.current.clientHeight}px`
  BoxRef.current.style.position = "fixed"
  BoxRef.current.style.top = 0
  BoxRef.current.style.left = 0
  BoxRef.current.style.transition = `transform .7s ease-out`
  BoxRef.current.style.width = "100%"
}

const add_func_to_img = BoxRef => {
  if (!BoxRef.current) return

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
  forwardRef,
  useRef,
  useContext,
  useState
} from 'react'
import ReactDOM from 'react-dom'
// import detectScrollY from './DetectScrollYVer2/DetectScrollY'
import { useWindowSize } from './WindowSizeContext'
import { WindowScrollYContext } from './DetectScrollY/DetectWindowScrollY'
import CompScrollToMoveConnector from './CompScrollToMove'
// import { init as initCompScrollMove } from './DetectScrollYVer2/DetectScrollYForComp'
export default FullPageScrollToMove

// export const init = () => {
//   const target = document.getElementById('smooth-scroll-move')
//   const html = target.innerHTML
//   ReactDOM.render(<ScrollToMove html={html} />, target)
//
//   initCompScrollMove()
// }
