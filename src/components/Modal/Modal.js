import React, { Component } from 'react'
import './Modal.css'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

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
      >
        {this.props.children}
      </ReactModal>
    )
  }
}

Modal.propTypes = {
  contentLabel: PropTypes.string,
  className: PropTypes.string,
  isOpen: PropTypes.bool
}

export default Modal
