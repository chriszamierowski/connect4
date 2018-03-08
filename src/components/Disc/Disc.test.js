import React from 'react';
import ReactDOM from 'react-dom';
import Disc from './Disc';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Disc value={1} />)
})

it(`has a class dependent on it's value`, () => {
  let props = {
    value: 10
  }
  const wrapper = shallow(<Disc value={props.value} />)
  expect(wrapper.find('div').first().hasClass(`Disc-player${props.value}`)).toBeTruthy()
})