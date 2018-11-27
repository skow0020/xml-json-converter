import './App.css';

import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import logo from './logo.svg';
import xmlParser from 'fast-xml-parser';

const Parser = require('fast-xml-parser').j2xParser;

class App extends Component {
  generateJSON() {
    const xmlElementContent = document.getElementById('xml-file-content').textContent;
    const isValid = xmlParser.validate(xmlElementContent);

    if (xmlElementContent === '') {
      alert('Select an xml document');
    } else if (isValid !== true) {
      alert(`Invalid XML: ${isValid.err.msg}`);
    } else {
      const element = document.getElementById('json-file-content');
      const tObj = xmlParser.getTraversalObj(xmlElementContent);
      const jsonObjConverted = xmlParser.convertToJson(tObj);
      element.hidden = false;
      element.textContent = JSON.stringify(jsonObjConverted, null, 2);
    }
  }

  generateXML() {
    const jsonElementContent = document.getElementById('json-file-content').textContent;
    const element = document.getElementById('xml-file-content');

    if (jsonElementContent === '') {
      alert('Select a json document');
      return;
    }

    const jsonParser = new Parser({
      format: true,
      indentBy: '  '
    });

    try {
      element.textContent = jsonParser.parse(JSON.parse(jsonElementContent));
      element.hidden = false;
    } catch (error) {
      alert(`Unable to generate json: ${error.message}`);
    }
  }

  readFile(e) {
    const file = e.target.files[0];
    let element;
    if (!file) return;
    if (file.type === 'application/json') element = document.getElementById('json-file-content');
    else if (file.type === 'text/xml') element = document.getElementById('xml-file-content');
    else {
      alert('File must be xml or json');
      return;
    }

    const reader = new FileReader();
    reader.onload = (g) => {
      const contents = g.target.result;
      element.hidden = false;
      element.textContent = contents;
    };
    reader.readAsText(file);
  }

  clearData() {
    document.getElementById('json-file-content').hidden = true;
    document.getElementById('json-file-content').textContent = '';
    document.getElementById('xml-file-content').hidden = true;
    document.getElementById('xml-file-content').textContent = '';
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Input id="file-input" type="file" onChange={e => this.readFile(e)} />
          <div id="container">
            <Button id="generate-json" variant="contained" color="primary" onClick={this.generateJSON}>
              Generate JSON
            </Button>
            <Button id="generate-xml" variant="contained" color="primary" onClick={this.generateXML}>
              Generate XML
            </Button>
          </div>
          <Button id="clear-button" variant="contained" color="secondary" onClick={this.clearData}>
            Clearasdf
          </Button>
        </header>
        <div className="content-container">
          <pre id="xml-file-content" className="file-content" hidden />
          <pre id="json-file-content" className="file-content" hidden />
        </div>
      </div>
    );
  }
}

export default App;
