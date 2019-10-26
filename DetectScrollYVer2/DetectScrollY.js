import React, { useState, useEffect, useRef } from "react"
import { TweenMax } from 'gsap'

const detectScrollY = WrappedComponent => {
  const DetectScrollY = props => {
    const [scroll_y, set_scroll_y] = useState(window.scrollY)
    const [position_y, set_position_y] = useState(0)
    const [is_show, set_is_show] = useState(false)
    const [is_all_show, set_is_all_show] = useState(false)
    const [is_vanish, set_is_vanish] = useState(false)
    const [y_from_all_show, set_y_from_all_show] = useState(0)
    const [y_from_show, set_y_from_show] = useState(0)
    const [y_from_vanish, set_y_from_vanish] = useState(0)
    const WraperRef = useRef(null)

    const handle_scroll = () => {
      set_scroll_y(window.scrollY)
      set_position_y(get_position(WraperRef.current))
      handle_is_show()
      handle_is_all_show()
      handle_is_vanish()
    }

    const get_position = element => {
      let xPosition = 0
      let yPosition = 0

      while (element) {
        xPosition +=
          element.offsetLeft - element.scrollLeft + element.clientLeft
        yPosition += element.offsetTop - element.scrollTop + element.clientTop
        element = element.offsetParent
      }

      return yPosition
    }

    const handle_is_show = () => {
      if (!WraperRef.current) return

      if (
        window.scrollY + window.innerHeight >=
          get_position(WraperRef.current) &&
        !is_show
      ) {
        set_is_show(true)
      } else if (
        window.scrollY + window.innerHeight < get_position(WraperRef.current) &&
        is_show
      ) {
        set_is_show(false)
      }

      set_y_from_show(
        window.scrollY + window.innerHeight - get_position(WraperRef.current) > 0 ?
        window.scrollY + window.innerHeight - get_position(WraperRef.current) :
        0
      )
    }

    const handle_is_all_show = () => {
      if (!WraperRef.current) return

      if (window.scrollY + window.innerHeight - WraperRef.current.clientHeight >= get_position(WraperRef.current) && !is_all_show) {
        set_is_all_show(true)
      } else if (window.scrollY + window.innerHeight - WraperRef.current.clientHeight < get_position(WraperRef.current) && is_all_show) {
        set_is_all_show(false)
      }

      set_y_from_all_show(
        window.scrollY + window.innerHeight - WraperRef.current.clientHeight - get_position(WraperRef.current) > 0 ?
        window.scrollY + window.innerHeight - WraperRef.current.clientHeight - get_position(WraperRef.current) :
        0
      )
    }

    const handle_is_vanish = () => {
      if (!WraperRef.current) return

      if (
        window.scrollY >= get_position(WraperRef.current) &&
        !is_vanish
      ) {
        set_is_vanish(true)
      } else if (
        window.scrollY < get_position(WraperRef.current) &&
        is_vanish
      ) {
        set_is_vanish(false)
      }

      set_y_from_vanish(
        window.scrollY - get_position(WraperRef.current) > 0 ?
        window.scrollY - get_position(WraperRef.current) :
        0
      )
    }

    useEffect(() => {
      handle_scroll()

      window.addEventListener("scroll", handle_scroll)
      return () => window.removeEventListener("scroll", handle_scroll)
    }, [])

    return (
      <WrappedComponent
        ref={WraperRef}
        y_from_vanish={y_from_vanish}
        y_from_all_show={y_from_all_show}
        y_from_show={y_from_show}
        is_show={is_show}
        is_all_show={is_all_show}
        position_y={position_y}
        scroll_y={scroll_y}
        {...props}
      />
    )
  }

  return DetectScrollY
}

const throttle = (func, limit = 100) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

const debounce = (func, delay = 50) => {
    let debounceTimer
    return function() {
        const context = this
        const args = arguments
            clearTimeout(debounceTimer)
                debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
    }
}

export default detectScrollY
