import React, { Component } from 'react'
import './Button.css'
import PropTypes from 'prop-types'

class Button extends Component {
  render() {
    return (
      <button className="Button" onClick={e => this.props.onClick(e)}>
        {this.props.children}
      </button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func
}

export default Button
