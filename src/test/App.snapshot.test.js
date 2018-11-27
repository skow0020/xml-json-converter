import App from '../App';
import React from 'react';
import snapshotRenderer from 'react-test-renderer';

describe('App Snapshot Tests', () => {
  it('App snapshot test', async () => {
    const wrapper = snapshotRenderer.create(
      <App />
    );
    const component = wrapper.toJSON();
    expect(component).toMatchSnapshot();
  });
});
