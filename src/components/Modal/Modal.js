import React, { Component } from 'react'
import './Modal.css'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

// needed to avoid error for ReactModal.setAppElement
if (process.env.NODE_ENV === 'test') {
  let root = document.createElement('div')
  root.id = 'root'

  document
    .getElementsByTagName('body')
    .item(0)
    .appendChild(root)
}

ReactModal.setAppElement('#root')

class Modal extends Component {
  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        contentLabel={this.props.contentLabel}
        className={`Modal--content ${this.props.className || ''}`}
        overlayClassName="Modal--overlay"
        closeTimeoutMS={1000}
        onRequestClose={this.props.onRequestClose}
      >
        {this.props.children}
      </ReactModal>
    )
  }
}

Modal.propTypes = {
  contentLabel: PropTypes.string,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func
}

export default Modal
