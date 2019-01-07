import App from '../components/App';
import ContentContainer from '../components/ContentContainer';
import React from 'react';
import UploadButton from '../components/UploadButton';
import { shallow } from 'enzyme';

describe('Unit Testing', () => {
  it('App renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
  });

  it('App renders and clears xml and json content', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({
      xmlContentHidden: false,
      jsonContentHidden: false,
      xmlContent: 'XML_CONTENT_EXAMPLE',
      jsonContent: 'JSON_CONTENT_EXAMPLE'
    });
    expect(wrapper.find('#xml-file-content').html()).toContain('XML_CONTENT_EXAMPLE');
    expect(wrapper.find('#json-file-content').html()).toContain('JSON_CONTENT_EXAMPLE');

    wrapper.find('#clear-button').simulate('click');
    expect(wrapper.find('#xml-file-content').html()).not.toContain('XML_CONTENT_EXAMPLE');
    expect(wrapper.find('#json-file-content').html()).not.toContain('JSON_CONTENT_EXAMPLE');
  });

  it('ContentContainer renders without crashing', () => {
    const wrapper = shallow(
      <ContentContainer
        id="xml-file-content"
        className="file-content"
        hidden={false}
        content="<XML></XML>"
      />
    );
    expect(wrapper.length).toBe(1);
  });

  it('UploadButton renders without crashing', () => {
    const wrapper = shallow(<UploadButton id="contained-button-file" className="upload-button" onChange={() => { }} />);
    expect(wrapper.length).toBe(1);
  });
});
