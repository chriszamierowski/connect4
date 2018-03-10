import React from 'react'
import ReactDOM from 'react-dom'
import Disc from 'components/Disc/Disc'
import CircleSpace from './CircleSpace'
import { shallow } from 'enzyme'

let props
let shallowCircleSpace
const circleSpace = () => {
  if (!shallowCircleSpace) {
    shallowCircleSpace = shallow(<CircleSpace {...props} />)
  }
  return shallowCircleSpace
}

beforeEach(() => {
  props = {
    value: undefined
  }
  shallowCircleSpace = undefined
})

it('renders without crashing', () => {
  circleSpace()
})

describe('when props.value is undefined', () => {
  it(`doesn't render a Disc`, () => {
    expect(circleSpace().find(Disc)).toHaveLength(0)
  })
})

describe('when props.value is defined', () => {
  beforeEach(() => {
    props.value = 1
  })

  it('renders a Disc', () => {
    expect(circleSpace().find(Disc)).toHaveLength(1)
  })

  it(`sets the rendered Disc's "value" prop to props.value`, () => {
    const cs = circleSpace()
    expect(cs.find(Disc).prop('value')).toEqual(1)
    cs.setProps({ value: 2 })
    expect(cs.find(Disc).prop('value')).toEqual(2)
  })
})
