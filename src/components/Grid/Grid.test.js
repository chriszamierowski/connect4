import React from 'react'
import ReactDOM from 'react-dom'
import Grid from './Grid'
import { mount } from 'enzyme'

let props
let mountedGrid
const grid = () => {
  if (!mountedGrid) {
    mountedGrid = mount(<Grid {...props} />)
  }
  return mountedGrid
}

beforeEach(() => {
  props = {
    onColumnChoice: jest.fn(),
    board: [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ]
  }
  mountedGrid = undefined
})

describe('when supplied with a proper board', () => {
  it('renders without crashing', () => {
    grid()
  })
})

// TODO - add tests for render()
// TODO - add tests for window resizing
