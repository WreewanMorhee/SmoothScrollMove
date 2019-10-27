const detectWindowScrollY = () => {
  const [scroll_y, set_scroll_y] = useState(window.scrollY)

  const handle_scroll = () => {
    set_scroll_y(window.scrollY)
  }

  useEffect(() => {
    handle_scroll()

    window.addEventListener("scroll", handle_scroll)
    return () => window.removeEventListener("scroll", handle_scroll)
  }, [])

  return scroll_y
}

import React, { useState, useEffect } from "react"
export const WindowScrollYContext = React.createContext(window.scrollY)
export const WindowScrollYProvider = WindowScrollYContext.Provider
export const WindowScrollYConsumer = WindowScrollYContext.Consumer
export default detectWindowScrollY
