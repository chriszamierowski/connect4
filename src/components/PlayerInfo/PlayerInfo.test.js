import React from 'react'
import ReactDOM from 'react-dom'
import Disc from './../Disc/Disc'
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

// describe('when props.isTheirTurn is false', () => {
//   it(`doesn't render a Disc`, () => {
//     expect(playerInfo().find(Disc)).toHaveLength(0)
//   })
// })

// describe('when props.value is defined', () => {
//   beforeEach(() => {
//     props.value = 1
//   })

//   it('renders a Disc', () => {
//     expect(playerInfo().find(Disc)).toHaveLength(1)
//   })

//   it(`sets the rendered Disc's "value" prop to props.value`, () => {
//     const cs = playerInfo()
//     expect(cs.find(Disc).prop('value')).toEqual(1)
//     cs.setProps({ value: 2 })
//     expect(cs.find(Disc).prop('value')).toEqual(2)
//   })
// })
