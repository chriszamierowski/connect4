import React, { Component } from 'react';
import './Grid.css';
import CircleSpace from 'components/CircleSpace/CircleSpace'
import PropTypes from 'prop-types';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.numColumns = this.props.board.length
    this.numRows = this.props.board[0].length

    this.state = {
      constrainedSquareDimension: 0
    }
  }

  renderCircleSpace (colInd, rowInd) {
    const circleValue = this.props.board[colInd][rowInd]
    return <CircleSpace
            key={rowInd}
            value={circleValue} />
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    const spaceHeight = this.el.clientHeight / this.numRows
    const spaceWidth = this.el.clientWidth / this.numColumns
    // figure out the smaller dimension to keep each space a square
    const constrainedSquareDimension = spaceHeight > spaceWidth ? spaceWidth : spaceHeight

    this.setState({ constrainedSquareDimension })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  render() {
    return (
      <div className="Grid"
        ref={ (el) => this.el = el}>
        <div className="Grid-inner"
          style={{
            height: this.state.constrainedSquareDimension * this.numRows + 'px',
            width: this.state.constrainedSquareDimension * this.numColumns + 'px'
          }}>
          {[...Array(this.numColumns)].map((col, colInd) => {
            return <div className="Grid-column" key={colInd} onClick={() => this.props.onColumnChoice(colInd)}>
              {[...Array(this.numRows)].map((row, rowInd) => {
                return this.renderCircleSpace(colInd, rowInd)
              })}
            </div>
          })}
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  onColumnChoice: PropTypes.func.isRequired,
  board: (props, propName) => {
    if (
      !props.board
      || !Array.isArray(props.board)
      || props.board.length < 4
      || !Array.isArray(props.board[0])
      || props.board[0].length < 4
    ) {
      return new Error('Board must be a multidimensional array at least 4x4')
    }
  }
}

export default Grid;
