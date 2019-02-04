import App from '../components/App';
import ContentContainer from '../components/ContentContainer';
import React from 'react';
import SimpleSnackbar from '../components/SimpleSnackbar';
import UploadButton from '../components/UploadButton';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('App Snapshot Tests', () => {
  it('App snapshot test', async () => {
    const wrapper = shallow(
      <App />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('ContentContainer hidden snapshot test', async () => {
    const wrapper = shallow(
      <ContentContainer
        id="xml-file-content"
        className="file-content"
        hidden
        content="<XML></XML>"
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('ContentContainer hidden=false snapshot test', async () => {
    const wrapper = shallow(
      <ContentContainer
        id="xml-file-content"
        className="file-content"
        hidden={false}
        content="<XML></XML>"
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('UploadButton snapshot test', async () => {
    const wrapper = shallow(
      <UploadButton id="contained-button-file" className="upload-button" onChange={() => { }} />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('SimpleSnackbar snapshot test', () => {
    const wrapper = shallow(<SimpleSnackbar open message="THIS IS A MESSAGE" />);
    wrapper.setState({
      open: true
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
