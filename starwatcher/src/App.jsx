import './App.css';
import React from 'react';
import Search from './Search';
import Results from './Results';
// import Container  from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends React.Component{

  state = {
    searchResult: null
  }

  handleResult = (result) => {
    this.setState({ "searchResult": result });
  }

  render() {
    return (
      <div className='container'>
        <Search handleResult={this.handleResult} />
        { this.state.searchResult &&  <Results sites = {this.state.searchResult["sites"]} /> }
      </div>
    );
  }
}

export default App;
