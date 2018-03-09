import React from 'react'
import ReactDOM from 'react-dom'
import Select from './Select'
import { mount } from 'enzyme'

let props
let mountedSelect
const select = () => {
  if (!mountedSelect) {
    mountedSelect = mount(<Select {...props} />)
  }
  return mountedSelect
}

beforeEach(() => {
  props = {
    options: [1, 2, 3],
    id: 'test',
    value: 2,
    onChange: jest.fn()
  }
  mountedSelect = undefined
})

it('renders without crashing', () => {
  select()
})

it('renders id', () => {
  expect(select().find('#test')).toBeDefined()
})

it('renders correct number of options', () => {
  expect(select().find('option')).toHaveLength(3)
})

it('renders value', () => {
  expect(select().props().value).toEqual(2)
})

// TODO - test onChange, which apparently is not straightforward?

it(`doesn't render label if one isn't passed`, () => {
  expect(select().find('label')).toHaveLength(0)
})

describe('when label is passed', () => {
  let thisSelect

  beforeEach(() => {
    props = {
      options: [1, 2, 3],
      id: 'test',
      label: 'Testing'
    }

    thisSelect = select()
  })

  it('renders label', () => {
    expect(thisSelect.find('label').text()).toContain('Testing')
  })
})
