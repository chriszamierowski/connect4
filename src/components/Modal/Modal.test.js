import React from 'react'
import ReactModal from 'react-modal'
import Modal from './Modal'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<Modal />)
})

it('renders <ReactModal>', () => {
  expect(shallow(<Modal />).find(ReactModal).length).toEqual(1)
})

it('opens modal when isOpen prop is truthy', () => {
  expect(
    shallow(<Modal isOpen={true} />)
      .find(ReactModal)
      .prop('isOpen')
  ).toEqual(true)
})
