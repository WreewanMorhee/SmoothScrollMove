class DetectScrollY extends React.Component {
  componentDidMount() {
    const { handle_scroll, target_DOM } = this.props
    handle_scroll()
    window.addEventListener("scroll", handle_scroll)

    const transition_style =  window.getComputedStyle(target_DOM, null).getPropertyValue('transition')

    target_DOM.style.transition = `${transition_style}, transform .7s ease-out`
  }

  componentDidUpdate() {
    const { target_DOM, y_from_show } = this.props
    if (!target_DOM.dataset.smc) return

    let transform_str = ''
   target_DOM.dataset.smc.split('/').forEach((move_data) => {
     const [style_name, times] = move_data.split('_')

     transform_str = `${transform_str} ${style_name}(${-y_from_show / (10 + Number(times))}px)`
   })

    target_DOM.style.transform = transform_str
  }

  componentWillMount() {
    window.removeEventListener("scroll", this.props.handle_scroll)
  }
  render () {
    return null
  }
}


const stateBox1 = withState('scroll_y', 'set_scroll_y', window.scrollY)
const stateBox2 = withState('position_y', 'set_position_y', 0)
const stateBox3 = withState('is_show', 'set_is_show', false)
const stateBox4 = withState('is_all_show', 'set_is_all_show', false)
const stateBox5 = withState('is_vanish', 'set_is_vanish', false)
const stateBox6 = withState('y_from_all_show', 'set_y_from_all_show', 0)
const stateBox7 = withState('y_from_show', 'set_y_from_show', 0)
const stateBox8 = withState('y_from_vanish', 'set_y_from_vanish', 0)

const logicBox1 = withHandlers({
  handle_scroll: ({
    set_scroll_y,
    set_position_y,
    handle_is_show,
    handle_is_all_show,
    handle_is_vanish,
    target_DOM
  }) => () => {
    set_scroll_y(window.scrollY)
    set_position_y(get_position(target_DOM))
    handle_is_show()
    handle_is_all_show()
    handle_is_vanish()
  }
})


const logicBox2 = withHandlers({
  handle_is_show: ({target_DOM, set_is_show, set_y_from_show, is_show}) => () => {
    if (!target_DOM) return

    if (
      window.scrollY + window.innerHeight >=
        get_position(target_DOM) &&
      !is_show
    ) {
      set_is_show(true)
    } else if (
      window.scrollY + window.innerHeight < get_position(target_DOM) &&
      is_show
    ) {
      set_is_show(false)
    }

    set_y_from_show(
      window.scrollY + window.innerHeight - get_position(target_DOM) > 0 ?
      window.scrollY + window.innerHeight - get_position(target_DOM) :
      0
    )
  },
  handle_is_all_show: ({target_DOM, set_is_all_show, set_y_from_all_show, is_all_show}) => () => {
    if (!target_DOM) return

    if (window.scrollY + window.innerHeight - target_DOM.clientHeight >= get_position(target_DOM) && !is_all_show) {
      set_is_all_show(true)
    } else if (window.scrollY + window.innerHeight - target_DOM.clientHeight < get_position(target_DOM) && is_all_show) {
      set_is_all_show(false)
    }

    set_y_from_all_show(
      window.scrollY + window.innerHeight - target_DOM.clientHeight - get_position(target_DOM) > 0 ?
      window.scrollY + window.innerHeight - target_DOM.clientHeight - get_position(target_DOM) :
      0
    )
  },
  handle_is_vanish: ({target_DOM, set_is_vanish, set_y_from_vanish, is_vanish}) => () => {
    if (!target_DOM) return

    if (
      window.scrollY >= get_position(target_DOM) &&
      !is_vanish
    ) {
      set_is_vanish(true)
    } else if (
      window.scrollY < get_position(target_DOM) &&
      is_vanish
    ) {
      set_is_vanish(false)
    }

    set_y_from_vanish(
      window.scrollY - get_position(target_DOM) > 0 ?
      window.scrollY - get_position(target_DOM) :
      0
    )
  }
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

const DetectScrollYConnector = compose(
  stateBox1,
  stateBox2,
  stateBox3,
  stateBox4,
  stateBox5,
  stateBox6,
  stateBox7,
  stateBox8,
  logicBox2,
  logicBox1
)(DetectScrollY)


import React from "react"
import ReactDOM from 'react-dom'
import { compose, withHandlers, withState } from 'recompose'

export const init = () => {
  const container = document.createElement("DIV");
  container.id = "comp-scroll-move";
  document.body.appendChild(container);

  const comp_list = Array.from(
    document.getElementsByClassName("smc")
  );

  ReactDOM.render(
    <>
      {comp_list.map(comp => (
        <DetectScrollYConnector target_DOM={comp} />
      ))}
    </>,
    document.getElementById("comp-scroll-move")
  );
};
