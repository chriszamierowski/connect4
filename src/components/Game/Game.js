import React, { Component } from 'react';
import './Game.css';
import Grid from 'components/Grid/Grid'

class Game extends Component {
  constructor (props) {
    super(props)

    this.numColumns = 4
    this.numRows = 9

    this.state = {
      board: Array(this.numColumns * this.numRows).fill(null),
      player1Turn: true
    }
  }

  handleColumnChoice (columnNum) {
    console.log('columnNum', columnNum)
    const board = this.state.board.slice()
    let ind = this.numColumns * this.numRows - (this.numColumns - columnNum)

    for (; ind >= 0; ind -= this.numColumns) {
      if (!board[ind]) {
        board[ind] = this.state.player1Turn ? 1 : 2

        this.setState({
          player1Turn: !this.state.player1Turn
        })
        break;
      }
    }

    this.setState({
      board: board
    })
  }

  render() {
    const board = this.state.board.slice()

    return (
      <div className="Game">
        <div className="Game-info">
          <p>{this.state.player1Turn ? 'player1' : 'player2'}</p>
        </div>
        <Grid
          numColumns={this.numColumns}
          numRows={this.numRows}
          onColumnChoice={(col) => this.handleColumnChoice(col)}
          board={board} />
      </div>
    );
  }
}

export default Game;
