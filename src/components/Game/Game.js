import React, { Component } from 'react'
import './Game.css'
import Grid from 'components/Grid/Grid'

class Game extends Component {
  constructor(props) {
    super(props)

    this.numColumns = 7
    this.numRows = 6

    const emptyColumn = Array(this.numRows).fill(null)

    this.state = {
      board: Array(this.numColumns).fill([...emptyColumn]),
      player1Turn: true,
      gameWon: false,
      gameOver: false,
      moveCount: 0
    }
  }

  handleColumnChoice(columnNum) {
    let board = this.state.board.slice()
    let column = board[columnNum].slice()
    const firstAvailableRow = this.getFirstAvailableRowInColumn(column)

    if (Number.isInteger(firstAvailableRow)) {
      column[firstAvailableRow] = this.state.player1Turn ? 1 : 2
      board[columnNum] = column

      this.setState({
        moveCount: this.state.moveCount + 1
      })

      if (this.checkForWin({ player: this.state.player1Turn ? 1 : 2, board })) {
        this.setState({
          gameWon: true,
          gameOver: true
        })
      } else if (this.state.moveCount === this.numRows * this.numColumns - 1) {
        this.setState({
          gameOver: true
        })
      } else {
        this.setState({
          player1Turn: !this.state.player1Turn
        })
      }

      this.setState({
        board: board
      })
    }
  }

  getFirstAvailableRowInColumn(column) {
    return column
      .map((c, i) => (c ? null : i))
      .filter(Number.isInteger)
      .pop()
  }

  checkForWin({ player, board }) {
    const numColumns = board.length
    const numRows = board[0].length

    // horizontal
    for (let row = 0; row < numRows - 3; row++) {
      for (let col = 0; col < numColumns; col++) {
        if (
          board[col][row] === player &&
          board[col][row + 1] === player &&
          board[col][row + 2] === player &&
          board[col][row + 3] === player
        ) {
          return true
        }
      }
    }
    // vertical
    for (let col = 0; col < numColumns - 3; col++) {
      for (let row = 0; row < this.numRows; row++) {
        if (
          board[col][row] === player &&
          board[col + 1][row] === player &&
          board[col + 2][row] === player &&
          board[col + 3][row] === player
        ) {
          return true
        }
      }
    }
    // bottom left -> top right
    for (let col = 3; col < numColumns; col++) {
      for (let row = 0; row < numRows - 3; row++) {
        if (
          board[col][row] === player &&
          board[col - 1][row + 1] === player &&
          board[col - 2][row + 2] === player &&
          board[col - 3][row + 3] === player
        )
          return true
      }
    }
    // top left -> bottom right
    for (let col = 3; col < numColumns; col++) {
      for (let row = 3; row < numRows; row++) {
        if (
          board[col][row] === player &&
          board[col - 1][row - 1] === player &&
          board[col - 2][row - 2] === player &&
          board[col - 3][row - 3] === player
        )
          return true
      }
    }

    return false
  }

  getGameStatus() {
    return this.state.gameOver
      ? this.state.gameWon
        ? `${this.state.player1Turn ? 'player1' : 'player2'} wins!`
        : 'Draw'
      : this.state.player1Turn ? 'player1' : 'player2'
  }

  render() {
    const board = this.state.board.slice()

    return (
      <div className="Game">
        <div className="Game-info">
          <p>{this.getGameStatus()}</p>
        </div>
        <Grid
          onColumnChoice={columnNum => this.handleColumnChoice(columnNum)}
          board={board}
          gameOver={this.state.gameOver}
        />
      </div>
    )
  }
}

export default Game
