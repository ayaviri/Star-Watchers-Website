import React from 'react';

class Graph extends React.Component{

  state = {
    searchResult: 'fnaf',
  }

  handleResult = (result) => {
    this.setState({ "searchResult": result });
  }

  render() {
    return (
      <div className='container'>
        {/* <Search handleResult={this.handleResult} /> */}
        {/* { this.state.searchResult &&  <Results sites = {this.state.searchResult["sites"]} /> } */}
      </div>
    );
  }
}

export default Graph;
