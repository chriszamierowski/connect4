import React from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<Button />)
})

it('renders children', () => {
  const wrapper = shallow(
    <Button>
      <span>test</span>
    </Button>
  )

  expect(wrapper.find('span')).toHaveLength(1)
})

it('calls onClick prop when clicked', () => {
  const handleClick = jest.fn()
  const wrapper = shallow(<Button onClick={handleClick} />)

  wrapper.simulate('click')
  expect(handleClick).toHaveBeenCalled()
})
