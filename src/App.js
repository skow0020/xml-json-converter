import './App.css';

import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import xmlParser from 'fast-xml-parser';

const Parser = require('fast-xml-parser').j2xParser;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xmlContentHidden: true,
      jsonContentHidden: true,
      xmlContent: '',
      jsonContent: ''
    };

    this.clearData = this.clearData.bind(this);
    this.generateJSON = this.generateJSON.bind(this);
    this.generateXML = this.generateXML.bind(this);
    this.readFile = this.readFile.bind(this);
  }

  generateJSON() {
    const xmlElementContent = this.state.xmlContent;
    const isValid = xmlParser.validate(xmlElementContent);

    if (xmlElementContent === '') {
      alert('Select an xml document');
    } else if (isValid !== true) {
      alert(`Invalid XML: ${isValid.err.msg}`);
    } else {
      const tObj = xmlParser.getTraversalObj(xmlElementContent);
      const jsonObjConverted = xmlParser.convertToJson(tObj);

      this.setState(() => ({
        jsonContentHidden: false,
        jsonContent: JSON.stringify(jsonObjConverted, null, 2)
      }));
    }
  }

  generateXML() {
    const jsonElementContent = this.state.jsonContent;

    if (jsonElementContent === '') {
      alert('Select a json document');
      return;
    }

    const jsonParser = new Parser({
      format: true,
      indentBy: '  '
    });

    try {
      this.setState(() => ({
        xmlContentHidden: false,
        xmlContent: jsonParser.parse(JSON.parse(jsonElementContent))
      }));
    } catch (error) {
      alert(`Unable to generate json: ${error.message}`);
    }
  }

  readFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (g) => {
        this.setState(() => ({
          jsonContentHidden: false,
          jsonContent: g.target.result
        }));
      };
      reader.readAsText(file);
    } else if (file.type === 'text/xml') {
      const reader = new FileReader();
      reader.onload = (g) => {
        this.setState(() => ({
          xmlContentHidden: false,
          xmlContent: g.target.result
        }));
      };
      reader.readAsText(file);
    } else {
      alert('File must be xml or json');
    }
  }

  clearData() {
    this.setState(() => ({
      xmlContentHidden: true,
      jsonContentHidden: true,
      xmlContent: '',
      jsonContent: ''
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <label id="file-select" htmlFor="contained-button-file">
            <input
              style={{ display: 'none' }}
              id="contained-button-file"
              type="file"
              name={this.state.inputName}
              onChange={e => this.readFile(e)}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>

          <div id="container">
            <Button id="generate-json" variant="contained" color="primary" onClick={() => this.generateJSON()}>
              Generate JSON
            </Button>
            <Button id="generate-xml" variant="contained" color="primary" onClick={() => this.generateXML()}>
              Generate XML
            </Button>
          </div>
          <Button id="clear-button" variant="contained" color="secondary" onClick={() => this.clearData()}>
            Clear
          </Button>
        </header>
        <div className="content-container">
          <pre
            id="xml-file-content"
            className="file-content"
            hidden={this.state.xmlContentHidden}
          >
            {this.state.xmlContent}
          </pre>
          <pre
            id="json-file-content"
            className="file-content"
            hidden={this.state.jsonContentHidden}
          >
            {this.state.jsonContent}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
