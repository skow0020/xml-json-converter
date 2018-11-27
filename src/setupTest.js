import { configureAxe, toHaveNoViolations } from 'jest-axe';

import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
expect.extend(toHaveNoViolations);

configure({
  adapter: new Adapter()
});

export const axe = configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa']
  }
});

let spy;
beforeEach(() => {
  if (spy) {
    spy.mockReset();
  }
  spy = jest.spyOn(global.console, 'error');
});

afterEach(() => {
  expect(spy).not.toHaveBeenCalled();
});

const defaultMatchMedia = () => ({
  matches: false,
  addListener() {},
  removeListener() {}
});

window.matchMedia = window.matchMedia || defaultMatchMedia;
