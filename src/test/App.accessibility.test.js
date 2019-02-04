import App from '../components/App';
import ContentContainer from '../components/ContentContainer';
import React from 'react';
import SimpleSnackbar from '../components/SimpleSnackbar';
import UploadButton from '../components/UploadButton';
import { axe } from '../setupTests';
import { shallow } from 'enzyme';

describe('App AccessibilityTest', () => {
  it('App is accessible', async () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });

  it('ContentContainer is accessible', async () => {
    const wrapper = shallow(
      <ContentContainer
        id="xml-file-content"
        className="file-content"
        hidden={false}
        content="<XML></XML>"
      />
    );
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });

  it('UploadButton is accessible', async () => {
    const wrapper = shallow(<UploadButton id="contained-button-file" className="upload-button" onChange={() => {}} />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });

  it('SimpleSnackbar is accessible', async () => {
    const wrapper = shallow(<SimpleSnackbar open message="TEST MESSAGE" />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
