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
