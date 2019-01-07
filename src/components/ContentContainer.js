import React, { Component } from 'react';

import PropTypes from 'prop-types';

class ContentContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { id, className, hidden, content } = this.props;
    return (
      <pre
        id={id}
        className={className}
        hidden={hidden}
      >
        {content}
      </pre>
    );
  }
}

export default ContentContainer;
