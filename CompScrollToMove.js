class CompScrollToMove extends React.Component {
  componentDidMount() {
    this.props.handle_scroll()
  }

  componentDidUpdate(prevProps) {
    const { scroll_y, handle_scroll, move_smc } = this.props

    if (prevProps.scroll_y !== scroll_y) {
      handle_scroll()
    }

    move_smc()
  }

  render () {
    return null
  }
}

const stateBox1 = withState('position_y', 'set_position_y', 0)
const stateBox2 = withState('is_show', 'set_is_show', false)
const stateBox3 = withState('y_from_show', 'set_y_from_show', 0)

const logicBox1 = withHandlers({
  handle_scroll: ({
    set_position_y,
    handle_is_show,
    target_DOM
  }) => () => {
    set_position_y(get_position(target_DOM))
    handle_is_show()
  },
  move_smc: ({target_DOM, full_page, y_from_show}) => () => {
    let transform_data = {}
    const param_arr = ['x', 'y', 'rotationX', 'rotationY', 'rotationZ', 'skewX', 'skewY']
    param_arr.forEach((name) => {
      const data_str = `smc${name.replace(name[0], name[0].toUpperCase())}`
      if (!target_DOM.dataset[data_str]) return

      transform_data[name] = Number(target_DOM.dataset[data_str]) * (-1) * y_from_show
    })

    const is_mobile = window.innerWidth <= 1024
    const transition_time = (is_mobile || !full_page) ? 0 : 0.7

    TweenMax.to(target_DOM, transition_time, {
      ...transform_data
    })
  }
})


const logicBox2 = withHandlers({
  handle_is_show: ({target_DOM, set_is_show, set_y_from_show, is_show, scroll_y}) => () => {
    if (!target_DOM) return

    if (
      scroll_y + window.innerHeight >=
        get_position(target_DOM) &&
      !is_show
    ) {
      set_is_show(true)
    } else if (
      scroll_y + window.innerHeight < get_position(target_DOM) &&
      is_show
    ) {
      set_is_show(false)
    }

    set_y_from_show(
      scroll_y + window.innerHeight - get_position(target_DOM) > 0 ?
      scroll_y + window.innerHeight - get_position(target_DOM) :
      0
    )
  },
})



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

const CompScrollToMoveConnectorBase = compose(
  stateBox1,
  stateBox2,
  stateBox3,
  logicBox2,
  logicBox1
)(CompScrollToMove)

const CompScrollToMoveConnector = props => {
  const scroll_y = useContext(WindowScrollYContext)

  return <CompScrollToMoveConnectorBase {...props} scroll_y={scroll_y} />
}



import React, { useContext } from "react"
import ReactDOM from 'react-dom'
import { compose, withHandlers, withState } from 'recompose'
import { TweenMax } from 'gsap'
import { WindowScrollYContext } from './DetectScrollY/DetectWindowScrollY'
export default CompScrollToMoveConnector
