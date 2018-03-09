import React, { Component } from 'react'
import './Game.css'
import Grid from 'components/Grid/Grid'
import Modal from 'components/Modal/Modal'
import Button from 'components/Button/Button'
import Select from 'components/Select/Select'

class Game extends Component {
  constructor(props) {
    super(props)

    this.defaultNumColumns = 7
    this.defaultNumRows = 6

    const minNumColumns = 4
    const maxNumColumns = 20
    const minNumRows = 4
    const maxNumRows = 20

    this.columnOptions = [...Array(maxNumColumns + 1).keys()].splice(
      minNumColumns
    )
    this.rowOptions = [...Array(maxNumRows + 1).keys()].splice(minNumRows)

    this.state = {
      numColumns: this.defaultNumColumns,
      numRows: this.defaultNumRows,
      board: null,
      player1Turn: true,
      showIntro: true,
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
      column[firstAvailableRow] = this.getNextToPlay()
      board[columnNum] = column

      this.setState({
        moveCount: this.state.moveCount + 1
      })

      if (this.checkForWin({ player: this.getNextToPlay(), board })) {
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

  getNextToPlay() {
    return this.state.player1Turn ? 1 : 2
  }

  getGameStatus() {
    return this.state.gameOver
      ? this.state.gameWon
        ? `${this.state.player1Turn ? 'player1' : 'player2'} wins!`
        : 'Draw'
      : this.state.player1Turn ? 'player1' : 'player2'
  }

  playGame() {
    const emptyColumn = Array(this.state.numRows).fill(null)

    this.setState({
      showIntro: false,
      board: Array(this.state.numColumns).fill([...emptyColumn])
    })
  }

  renderGrid() {
    const board = this.state.board && this.state.board.slice()

    return (
      board && (
        <Grid
          onColumnChoice={columnNum => this.handleColumnChoice(columnNum)}
          board={board}
          gameOver={this.state.gameOver}
          nextToPlay={this.getNextToPlay()}
        />
      )
    )
  }

  renderGameInfo() {
    return (
      this.state.board && (
        <div className="Game-info">
          <p>{this.getGameStatus()}</p>
        </div>
      )
    )
  }

  updateGrid(type) {
    return e => {
      this.setState({
        [type]: parseInt(e.target.value, 10)
      })
    }
  }

  render() {
    return (
      <div className="Game">
        {this.renderGameInfo()}
        {this.renderGrid()}
        <Modal
          isOpen={this.state.showIntro}
          contentLabel="Connect Four Intro"
          className="Modal--intro"
        >
          <h1>Connect 4</h1>
          <p>Select grid size:</p>
          <div>
            <Select
              id="columns"
              label="Columns"
              value={this.state.numColumns}
              onChange={this.updateGrid('numColumns')}
              options={this.columnOptions}
            />
            <Select
              id="rows"
              label="Rows"
              value={this.state.numRows}
              onChange={this.updateGrid('numRows')}
              options={this.rowOptions}
            />
          </div>
          <Button onClick={() => this.playGame()}>Play</Button>
        </Modal>
      </div>
    )
  }
}

export default Game
