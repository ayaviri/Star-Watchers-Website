import React from 'react';
import Site from "./Site";
import Graph from './Graph';

class Results extends React.Component {
  render() { 
    return (
      <div className = "App-result-container">
          <Graph q={this.props.q} />
          <h2> Results:</h2>
          { this.props.sites.map((site) => {
            return <Site name={site.name} link={site.link} posts={site.posts} key={site.link} />
          })}
      </div>
    )    
  }
}

export default Results