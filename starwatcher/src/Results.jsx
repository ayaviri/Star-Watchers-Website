import React from 'react';
import Site from "./Site";

class Results extends React.Component {
  render() { 
    return (
      <div className = "App-result-container">
          <h5> Results:</h5>
          { this.props.sites.map((site) => {
            return <Site name={site.name} link={site.link} posts={site.posts} key={site.link} />
          })}
      </div>
    )    
  }
}

export default Results