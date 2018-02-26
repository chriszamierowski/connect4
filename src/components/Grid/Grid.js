import React, { Component } from 'react';
import './Grid.css';
import Column from 'components/Column/Column'

class Grid extends Component {
  render() {
    return (
      <div className="Grid">
        {[...Array(7)].map((v, col) => {
          return <Column key={col} />
        })}
      </div>
    );
  }
}

export default Grid;
