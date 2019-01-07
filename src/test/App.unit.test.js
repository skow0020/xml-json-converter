import App from '../components/App';
import React from 'react';
import { shallow } from 'enzyme';

describe('App Test', () => {
  it('App renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
  });
});
