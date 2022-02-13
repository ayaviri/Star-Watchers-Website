import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React from 'react';
import Search from './Search.jsx';
import Results from './Results.jsx';
import Site from './Site.jsx';

const API_URL = "http://localhost:3000"
class App extends React.Component{
  
  state = {
    query: null,
    searchResult: null,
    trends: null
  }
  
  handleResult = (q) => {
  // Get the trending data US
  this.setState({'query': q})
  axios.get(`${API_URL}/search/data?q=${q}`, {
    headers: {
        'Content-type': 'application/json',
    }}).then(res => {
    console.log(res.data)
    this.setState({"searchResult":res.data})
  })
}

  componentDidMount() {
    // Get the trending data US
    axios.get(`${API_URL}/trends`, {
      headers: {
          'Content-type': 'application/json',
      }}).then(res => {
      console.log(res.data.posts)
      this.setState({"trends":res.data.posts})
    })
  }

  getTrending() {
    if (this.state.trends != null) {
      console.log("From GET", this.state.trends)
      return <Site name="Trending in the US" link="https://news.google.com/topstories?hl=en-US&gl=US&ceid=US" posts={this.state.trends}/> 
    }
    return "";
  }
  
  render() {
    return (
      <div className='container'>
        <Search handleResult={this.handleResult} />
        { this.state.searchResult ?  
        <Results sites = {this.state.searchResult["sites"]} q = {this.state.query} /> :
        this.getTrending()}
        
      </div>
    );
  }
}

export default App;
