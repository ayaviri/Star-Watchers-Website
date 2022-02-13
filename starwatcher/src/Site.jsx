import React, { Component } from 'react';
import Post from './Post';

class Site extends Component {
    render() { 
        return (<div>
            <h3>{this.props.name}</h3>
            <a className="btn btn-primary" href={this.props.link}>See on {this.props.name}</a>

            <ul>{ this.props.posts.map(post => {
                return <Post name={post.name} link={post.link} key={post.link} />;
            }) }
            </ul>
        </div>);
    }
}
 
export default Site;