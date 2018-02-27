import React, { Component } from 'react';
import './Grid.css';
import Column from 'components/Column/Column'

class Grid extends Component {
  render() {
    return (
      <div className="Grid">
        {[...Array(this.props.numColumns)].map((v, col) => {
          return <Column
            key={col}
            onColumnChoice={() => this.props.onColumnChoice(col)}
            numRows={this.props.numRows} />
        })}
      </div>
    );
  }
}

export default Grid;
