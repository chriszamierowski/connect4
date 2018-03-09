import React from 'react'
import ReactDOM from 'react-dom'
import Game from './Game'
import Grid from './../Grid/Grid'
import { mount } from 'enzyme'

let props
let mountedGame
const game = () => {
  if (!mountedGame) {
    mountedGame = mount(<Game {...props} />)
  }
  return mountedGame
}

beforeEach(() => {
  props = {}
  mountedGame = undefined
})

it('renders without crashing', () => {
  game()
})

it(`starts as player 1's turn`, () => {
  expect(game().state().player1Turn).toBeTruthy()
})

it('toggles text depending on whose turn it is', () => {
  const thisGame = game()
  const text1 = thisGame.find('div.Game-info p').text()

  thisGame.setState({
    player1Turn: !thisGame.state().player1Turn
  })

  const text2 = thisGame.find('div.Game-info p').text()
  expect(text1).not.toEqual(text2)
})

it('renders a <Grid /> component', () => {
  expect(game().find(Grid)).toHaveLength(1)
})

describe('the <Grid /> component', () => {
  let receivedProps
  let thisGame

  beforeEach(() => {
    thisGame = game()
    receivedProps = thisGame.find(Grid).props()
  })

  it('receives board', () => {
    expect(receivedProps.board).toEqual(thisGame.state().board)
  })

  it('receives nextToPlay', () => {
    expect(receivedProps.nextToPlay).toBeDefined()
  })

  // TODO - add test for onColumnChoice
})

// TODO - add test for handleColumnChoice

it('getFirstAvailableRowInColumn() returns first (from bottom aka last in array) row space available', () => {
  const thisGame = game()

  expect(
    thisGame.instance().getFirstAvailableRowInColumn([null, null, 2, 2, 1])
  ).toEqual(1)
  expect(
    thisGame.instance().getFirstAvailableRowInColumn([null, null, null])
  ).toEqual(2)
  expect(
    thisGame.instance().getFirstAvailableRowInColumn([1, 1, 1])
  ).not.toBeDefined()
})

describe('check for win', () => {
  it('should return false if no winner', () => {
    const thisGame = game()

    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [
          [null, null, 2, 2],
          [null, null, 1, 2],
          [null, 1, 2, 2],
          [null, 1, 1, 1]
        ]
      })
    ).toBeFalsy()
    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [
          [null, null, null, null, 1, 2],
          [null, null, null, null, 2, 2],
          [null, 1, 1, 1, 2, 1],
          [null, null, 1, 1, 2, 2],
          [null, null, null, 2, 1, 1]
        ]
      })
    ).toBeFalsy()
    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [
          [null, null, 1, 1, 2, 1],
          [null, null, 2, 2, 1, 2],
          [null, null, 1, 2, 2, 1],
          [null, null, 2, 1, 2, 2],
          [null, null, 1, 2, 1, 1]
        ]
      })
    ).toBeFalsy()
  })

  it('should detect horizontal wins', () => {
    const thisGame = game()

    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [
          [null, null, 2, 2],
          [null, null, 1, 2],
          [null, 1, 2, 2],
          [1, 1, 1, 1]
        ]
      })
    ).toBeTruthy()
    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [
          [null, null, null, null, 2, 2],
          [null, null, null, null, 1, 2],
          [1, 1, 1, 1, 2, 1],
          [null, null, 1, 1, 2, 2],
          [null, null, null, 2, 1, 1]
        ]
      })
    ).toBeTruthy()
    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [
          [null, null, 1, 1, 1, 1],
          [null, null, 2, 2, 1, 2],
          [null, null, 1, 2, 2, 1],
          [null, null, 1, 2, 2, 2],
          [null, null, null, 2, 1, 1]
        ]
      })
    ).toBeTruthy()
  })

  it('should detect vertical wins', () => {
    const thisGame = game()

    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [[1, 1, 2, 2], [null, 1, 1, 2], [null, 1, 2, 2], [null, 1, 2, 1]]
      })
    ).toBeTruthy()
    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [
          [null, null, null, 1, 2, 2],
          [2, 2, 2, 1, 1, 2],
          [null, 1, 1, 1, 2, 1],
          [null, null, 1, 1, 2, 2],
          [null, null, 2, 2, 1, 1]
        ]
      })
    ).toBeTruthy()
    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [
          [null, null, null, null, null, null],
          [null, null, 2, 2, 1, 1],
          [null, null, 1, 2, 2, 1],
          [null, null, 1, 2, 2, 1],
          [null, null, null, 2, 1, 1]
        ]
      })
    ).toBeTruthy()
  })

  it('should detect diagonal wins', () => {
    const thisGame = game()

    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [
          [1, 1, 2, 2],
          [null, 1, 1, 2],
          [null, 1, 1, 2],
          [null, null, 2, 1]
        ]
      })
    ).toBeTruthy()
    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [
          [null, null, null, 2, 2, 2],
          [null, 2, 2, 1, 1, 2],
          [null, 1, 1, 1, 2, 1],
          [null, null, 1, 1, 2, 2],
          [null, 1, 2, 2, 1, 1]
        ]
      })
    ).toBeTruthy()
    expect(
      thisGame.instance().checkForWin({
        player: 1,
        board: [
          [null, null, null, 2, 1, null],
          [null, null, 2, 1, 1, 1],
          [null, null, 1, 2, 2, 1],
          [null, 1, 1, 2, 2, 2],
          [null, null, 2, 2, 1, 1]
        ]
      })
    ).toBeTruthy()
  })

  it('should detect wins for both players', () => {
    const thisGame = game()

    expect(
      thisGame.instance().checkForWin({
        player: 2,
        board: [
          [1, 1, 2, 2],
          [null, 1, 2, 1],
          [null, 1, 2, 2],
          [null, null, 2, 1]
        ]
      })
    ).toBeTruthy()
  })
})
