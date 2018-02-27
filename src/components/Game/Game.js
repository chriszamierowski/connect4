import React, { Component } from 'react';

import Grid from 'components/Grid/Grid'

class Game extends Component {
  constructor (props) {
    super(props)

    this.numColumns = 7
    this.numRows = 6

    this.state = {
      board: Array(this.numColumns * this.numRows).fill(null)
    }
  }

  handleColumnChoice (columnNum) {
    console.log('columnNum', columnNum)
    const board = this.state.board.slice()
    let ind = this.numColumns * this.numRows - (this.numColumns - columnNum)

    for (; ind >= 0; ind -= this.numColumns) {
      if (!board[ind]) {
        board[ind] = true
        break;
      }
    }

    this.setState({
      board: board
    })
  }

  render() {
    return (
      <Grid
        numColumns={this.numColumns}
        numRows={this.numRows}
        onColumnChoice={(col) => this.handleColumnChoice(col)} />
    );
  }
}

export default Game;
