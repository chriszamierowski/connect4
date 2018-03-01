import React, { Component } from 'react';
import './Grid.css';
import CircleSpace from 'components/CircleSpace/CircleSpace'

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      constrainedSquareDimension: 0
    }
  }

  renderCircleSpace (colInd, rowInd) {
    const key = (rowInd * this.props.numColumns) + colInd
    const circleValue = this.props.board[key]
    return <CircleSpace
            key={key}
            value={circleValue} />
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    const spaceHeight = this.el.clientHeight / this.props.numRows
    const spaceWidth = this.el.clientWidth / this.props.numColumns
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
            height: this.state.constrainedSquareDimension * this.props.numRows + 'px',
            width: this.state.constrainedSquareDimension * this.props.numColumns + 'px'
          }}>
          {[...Array(this.props.numColumns)].map((col, colInd) => {
            return <div className="Grid-column" key={colInd} onClick={() => this.props.onColumnChoice(colInd)}>
              {[...Array(this.props.numRows)].map((row, rowInd) => {
                return this.renderCircleSpace(colInd, rowInd)
              })}
            </div>
          })}
        </div>
      </div>
    );
  }
}

export default Grid;
