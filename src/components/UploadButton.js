import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class UploadButton extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { id, className, onChange } = this.props;
    return (
      <label id="file-select" htmlFor={id}>
        <input
          style={{ display: 'none' }}
          id={id}
          type="file"
          name={className}
          onChange={onChange}
        />
        <Button variant="contained" component="span">Upload File</Button>
      </label>
    );
  }
}

export default UploadButton;
