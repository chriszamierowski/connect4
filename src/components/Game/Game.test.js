import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import Grid from './../Grid/Grid';
import { mount } from 'enzyme';

let props;
let mountedGame;
const game = () => {
  if (!mountedGame) {
    mountedGame = mount(
      <Game {...props} />
    );
  }
  return mountedGame;
}

beforeEach(() => {
  props = {
  };
  mountedGame = undefined;
});

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

  it('receives numColumns', () => {
    expect(receivedProps.numColumns).toEqual(thisGame.instance().numColumns)
  })

  it('receives numRows', () => {
    expect(receivedProps.numRows).toEqual(thisGame.instance().numRows)
  })

  it('receives board', () => {
    expect(receivedProps.board).toEqual(thisGame.state().board)
  })

  // TODO - add test for onColumnChoice
})

// TODO - add test for handleColumnChoice
