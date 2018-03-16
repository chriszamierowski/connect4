import React, { Component } from 'react'
import Modal from 'components/Modal/Modal'
import { Link, Redirect } from 'react-router-dom'

class About extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: true
    }

    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <div className="About">
        {this.state.showModal ? (
          <Modal
            isOpen={this.state.showModal}
            contentLabel="About"
            onRequestClose={this.handleCloseModal}
          >
            <h1>About</h1>
            <p>
              This Connect 4 implementation is a pedagogical side project using
              React and{' '}
              <a
                href="https://github.com/chriszamierowski/connect4/blob/master/package.json"
                target="_blank"
                rel="noopener noreferrer"
              >
                some other good stuff
              </a>. Play <Link to="/">here</Link> or view the source code{' '}
              <a
                href="https://github.com/chriszamierowski/connect4"
                target="_blank"
                rel="noopener noreferrer"
              >
                on Github
              </a>.
            </p>
          </Modal>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    )
  }
}

export default About
