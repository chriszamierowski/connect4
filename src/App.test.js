import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import Game from './components/Game/Game';

it('renders without crashing', () => {
  shallow(<App />)
})

it('renders a <Game /> component', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(Game)).toHaveLength(1)
})

it('the <Game /> component receives no props', () => {
  const wrapper = shallow(<App />)
  expect(Object.keys(wrapper.find(Game).props())).toHaveLength(0)
})