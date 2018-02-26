import React, { Component } from 'react';
import './Column.css';
import CircleSpace from 'components/CircleSpace/CircleSpace'

class Column extends Component {
  render() {
    const rows = 6

    return (
      <div className="Column">
        {[...Array(rows)].map((v, row) => {
          return <CircleSpace key={row} />
        })}
      </div>
    );
  }
}

export default Column;
