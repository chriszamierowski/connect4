import React from 'react'
import ReactDOM from 'react-dom'
import Column from './Column'
import CircleSpace from 'components/CircleSpace/CircleSpace'
import { mount } from 'enzyme'

let props
let mountedColumn
const column = () => {
  if (!mountedColumn) {
    mountedColumn = mount(<Column {...props} />)
  }
  return mountedColumn
}

beforeEach(() => {
  props = {
    onClick: jest.fn(),
    column: [null, 2, 1],
    isDisabled: undefined
  }
  mountedColumn = undefined
})

it('renders without crashing', () => {
  column()
})

it('renders proper number of <CircleSpace /> components', () => {
  expect(column().find(CircleSpace)).toHaveLength(props.column.length)
})

describe('when not disabled', () => {
  let thisColumn

  describe('and column not full', () => {
    beforeEach(() => {
      props = {
        onClick: jest.fn(),
        column: [null, 2, 1],
        isDisabled: undefined
      }

      thisColumn = column()
    })

    it('isClickable should be true', () => {
      expect(thisColumn.instance().isClickable()).toBeTruthy()
    })
  })

  describe('and column full', () => {
    beforeEach(() => {
      props = {
        onClick: jest.fn(),
        column: [1, 2, 1],
        isDisabled: undefined
      }

      thisColumn = column()
    })

    it('isClickable should be false', () => {
      expect(thisColumn.instance().isClickable()).toBeFalsy()
    })
  })
})

describe('when disabled', () => {
  let thisColumn

  describe('and column not full', () => {
    beforeEach(() => {
      props = {
        onClick: jest.fn(),
        column: [null, 2, 1],
        isDisabled: true
      }

      thisColumn = column()
    })

    it('isClickable should be false', () => {
      expect(thisColumn.instance().isClickable()).toBeFalsy()
    })
  })

  describe('and column full', () => {
    beforeEach(() => {
      props = {
        onClick: jest.fn(),
        column: [1, 2, 1],
        isDisabled: true
      }

      thisColumn = column()
    })

    it('isClickable should be false', () => {
      expect(thisColumn.instance().isClickable()).toBeFalsy()
    })
  })
})

describe('the <CircleSpace /> component', () => {
  let receivedProps
  let thisColumn

  beforeEach(() => {
    thisColumn = column()
    receivedProps = thisColumn
      .find(CircleSpace)
      .at(1)
      .props()
  })

  it('receives value', () => {
    expect(receivedProps.value).toEqual(2)
  })
})
