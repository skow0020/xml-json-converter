import App from '../components/App';
import ContentContainer from '../components/ContentContainer';
import React from 'react';
import UploadButton from '../components/UploadButton';
import snapshotRenderer from 'react-test-renderer';

describe('App Snapshot Tests', () => {
  it('App snapshot test', async () => {
    const wrapper = snapshotRenderer.create(
      <App />
    );
    const component = wrapper.toJSON();
    expect(component).toMatchSnapshot();
  });

  it('ContentContainer hidden snapshot test', async () => {
    const wrapper = snapshotRenderer.create(
      <ContentContainer
        id="xml-file-content"
        className="file-content"
        hidden
        content="<XML></XML>"
      />
    );
    const component = wrapper.toJSON();
    expect(component).toMatchSnapshot();
  });

  it('ContentContainer hidden=false snapshot test', async () => {
    const wrapper = snapshotRenderer.create(
      <ContentContainer
        id="xml-file-content"
        className="file-content"
        hidden={false}
        content="<XML></XML>"
      />
    );
    const component = wrapper.toJSON();
    expect(component).toMatchSnapshot();
  });

  it('UploadButton snapshot test', async () => {
    const wrapper = snapshotRenderer.create(
      <UploadButton id="contained-button-file" className="upload-button" onChange={() => { }} />
    );
    const component = wrapper.toJSON();
    expect(component).toMatchSnapshot();
  });
});
