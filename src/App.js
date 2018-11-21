import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import parser from 'fast-xml-parser';
let Parser = require("fast-xml-parser").j2xParser;

class App extends Component {
  generateJSON() {
    let xmlElementContent = document.getElementById('xml-file-content').textContent;
    let isValid = parser.validate(xmlElementContent);

    if (xmlElementContent === "") {
      alert("Select an xml document")
      return;
    }
    else if (isValid !== true) {
      alert(`Invalid XML: ${isValid.err.msg}`);
      return;
    }
    
    let element = document.getElementById('json-file-content');
    let tObj = parser.getTraversalObj(xmlElementContent);
    let jsonObjConverted = parser.convertToJson(tObj);
    element.hidden = false;
    element.textContent = JSON.stringify(jsonObjConverted, null, 2)
  }

  generateXML() {
    let jsonElementContent = document.getElementById('json-file-content').textContent;
    let element = document.getElementById('xml-file-content');

    if (jsonElementContent === "") {
      alert("Select a json document")
      return;
    }
    let parser = new Parser({
      format: true,
      indentBy: "  ",
    });

    try {      
      element.textContent = parser.parse(JSON.parse(jsonElementContent));
      element.hidden = false;
    } catch (error) {
      alert(`Unable to generate json: ${error.message}`);
    }
    
  }

  readFile(e) {
    let file = e.target.files[0];
    let element;
    if (!file) return;
    if (file.type === "application/json") element = document.getElementById('json-file-content');
    else if (file.type === "text/xml") element = document.getElementById('xml-file-content');
    else {
      alert("File must be xml or json")
      return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
      let contents = e.target.result;
      element.hidden = false
      element.textContent = contents;
    };
    reader.readAsText(file);
  }

  clearData() {
    document.getElementById('json-file-content').hidden = true;
    document.getElementById('json-file-content').textContent = "";
    document.getElementById('xml-file-content').hidden = true;
    document.getElementById('xml-file-content').textContent = "";
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Input id="file-input" type="file" onChange={(e) => this.readFile(e)} />
          <div id="container">
            <Button id="generate-json" variant="contained" color="primary" onClick={this.generateJSON}>
              Generate JSON
          </Button>
            <Button id="generate-xml" variant="contained" color="primary" onClick={this.generateXML}>
              Generate XML
          </Button>
          </div>
          <Button id="clear-button" variant="contained" color="secondary" onClick={this.clearData}>
            Clear
          </Button>
        </header>
        <body>
          <div class="content-container">
            <pre id="xml-file-content" class="file-content" hidden={true}></pre>
            <pre id="json-file-content" class="file-content" hidden={true}></pre>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
