import React, { Component } from 'react';
import './Grid.css';
import CircleSpace from 'components/CircleSpace/CircleSpace'

class Grid extends Component {
  renderCircleSpace (colInd, rowInd) {
    const key = (rowInd * this.props.numColumns) + colInd
    const circleValue = this.props.board[key]
    return <CircleSpace
            key={key}
            value={circleValue} />
  }

  render() {
    return (
      <div className="Grid">
        {[...Array(this.props.numColumns)].map((col, colInd) => {
          return <div className="Grid-column" key={colInd}>
            <button
              onClick={() => this.props.onColumnChoice(colInd)}
              >Choose</button>
            {[...Array(this.props.numRows)].map((row, rowInd) => {
              return this.renderCircleSpace(colInd, rowInd)
            })}
          </div>
        })}
      </div>
    );
  }
}

export default Grid;
