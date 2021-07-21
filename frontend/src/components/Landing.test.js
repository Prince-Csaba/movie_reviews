import React from 'react';
import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import '../setupTests';
import Landing from './Landing';


/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<Landing {...props} />);
  if (state) wrapper.setState(state);
  return wrapper
}

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

test('renders without crashing', () => {
  const wrapper = setup();
  const landingComponent = findByTestAttr(wrapper, 'component-landing');
  expect(landingComponent.length).toBe(1);
});
