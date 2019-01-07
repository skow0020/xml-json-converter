import App from '../components/App';
import React from 'react';
import { axe } from '../setupTests';
import { shallow } from 'enzyme';

describe('App AccessibilityTest', () => {
  it('App is accessible', async () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
