export const useWindowSize = () => {
  const [window_size, set_window_size] = useState(getSize())

  useEffect(() => {
    window.addEventListener('resize', handleResize(set_window_size))

    return () => {
      window.removeEventListener('resize', handleResize(set_window_size))
    }
  }, [])

  return window_size
}

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

const handleResize = set_window_size => () => {
  set_window_size(getSize())
}

import React, { useState, useEffect } from 'react'
