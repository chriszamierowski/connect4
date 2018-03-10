import React, { Component } from 'react'
import './Grid.css'
import Column from 'components/Column/Column'
import PropTypes from 'prop-types'

class Grid extends Component {
  constructor(props) {
    super(props)

    this.numColumns = this.props.board.length
    this.numRows = this.props.board[0].length

    this.state = {
      constrainedSquareDimension: 0
    }
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  updateDimensions() {
    const spaceHeight = this.el.clientHeight / (this.numRows + 1)
    const spaceWidth = this.el.clientWidth / this.numColumns
    // gives some extra room for CSS add-ons
    const shrinkCoefficient = 1
    // figure out the smaller dimension to keep each space a square
    const constrainedSquareDimension =
      (spaceHeight > spaceWidth ? spaceWidth : spaceHeight) * shrinkCoefficient

    this.setState({ constrainedSquareDimension })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  render() {
    return (
      <div
        className="Grid"
        ref={el => (this.el = el)}
        style={{
          paddingTop: this.state.constrainedSquareDimension + 'px'
        }}
      >
        <div
          className="Grid-inner"
          style={{
            height: this.state.constrainedSquareDimension * this.numRows + 'px',
            width:
              this.state.constrainedSquareDimension * this.numColumns + 'px'
          }}
        >
          {this.props.board.map((column, i) => {
            return (
              <Column
                key={i}
                column={column}
                onClick={() => this.props.onColumnChoice(i)}
                isDisabled={this.props.gameOver}
                nextToPlay={this.props.nextToPlay}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

Grid.propTypes = {
  onColumnChoice: PropTypes.func.isRequired,
  board: (props, propName) => {
    if (
      !props.board ||
      !Array.isArray(props.board) ||
      props.board.length < 4 ||
      !Array.isArray(props.board[0]) ||
      props.board[0].length < 4
    ) {
      return new Error('Board must be a multidimensional array at least 4x4')
    }
  },
  gameOver: PropTypes.bool,
  nextToPlay: PropTypes.number
}

export default Grid
