import './App.css';
import React from 'react';
import Search from './Search.jsx';
import Results from './Results.jsx';
// import Container  from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
  
  state = {
    searchResult: null
  }
  
  handleResult = (result) => {
    API.getData(result).then((result, resolve) => {
      this.setState({ "searchResult": result});
    }).catch((error) => {
      alert(error);
    });
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
