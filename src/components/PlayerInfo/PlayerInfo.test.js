import React from 'react'
import ReactDOM from 'react-dom'
import Disc from 'components/Disc/Disc'
import PlayerInfo from './PlayerInfo'
import { shallow } from 'enzyme'

let props
let shallowPlayerInfo
const playerInfo = () => {
  if (!shallowPlayerInfo) {
    shallowPlayerInfo = shallow(<PlayerInfo {...props} />)
  }
  return shallowPlayerInfo
}

beforeEach(() => {
  props = {
    value: 1,
    isTheirTurn: true
  }
  shallowPlayerInfo = undefined
})

it('renders without crashing', () => {
  playerInfo()
})

it('renders proper Disc', () => {
  expect(
    playerInfo()
      .find(Disc)
      .props().value
  ).toEqual(props.value)
})
