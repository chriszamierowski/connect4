import React, { Component } from 'react';
import './Column.css';
import CircleSpace from 'components/CircleSpace/CircleSpace'

class Column extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <div className="Column">
        <button
          onClick={this.onColumnChoice}
          >Choose</button>
        {[...Array(this.props.numRows)].map((v, row) => {
          return <CircleSpace key={row} />
        })}
      </div>
    );
  }
}

export default Column;
