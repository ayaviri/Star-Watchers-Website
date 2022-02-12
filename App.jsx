import './App.css';
import React, {useState} from 'react';
import { render } from '@testing-library/react';

class App extends React.Component{
  
  state = {
    value: ''
  };

  getInput = (val) =>{
      console.log(val.target.value);
      this.setState({value: val.target.value});
  }

  handleSearch = () => {
    const value = this.state.value;
  };

  render() {
    console.log(this.state);

    return (
      <div className="App">
        <header className="App-header">
            <h2> Input Search Term:</h2>
            <input type = "text" onChange = {this.getInput}/>
            <button onClick = {this.handleSearch}>Search</button>
        </header>
      </div>
    );
  }
}

export class Results extends React.Component {
  
  state = {
    value: ''
  };

  render() { 
    return (
      <div className = "App">
          <h4> Results:</h4>

      </div>
    );
  }
}
 
        // <a
        //   className="App-link"
        //   href="https://twitter.com/home"
        //   target="_blank"
        //   rel="noopener noreferrer"
        // >
        //   Test Link
        // </a>

export default App;
