import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
let parser = require('fast-xml-parser');

class App extends Component {
  onClick() {
    let xmlElementContent = document.getElementById('xml-file-content').textContent;

    if (parser.validate(xmlElementContent) === false) {
      alert("Invalid xml!")
    }
    else {
      let tObj = parser.getTraversalObj(xmlElementContent);
      let jsonObjConverted = parser.convertToJson(tObj);
      document.getElementById('json-file-content').textContent = JSON.stringify(jsonObjConverted, null, 2)
    }
  }

  readXmlFile(e) {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      let contents = e.target.result;
      let element = document.getElementById('xml-file-content');
      element.hidden = false
      element.textContent = contents;
    };
    reader.readAsText(file);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Input id="xml-file-input" type="file" onChange={(e) => this.readXmlFile(e)} />
          <Button id="run-validation" variant="contained" color="primary" onClick={this.onClick}>
            Generate JSON
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
