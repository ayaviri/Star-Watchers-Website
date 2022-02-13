import React, { Component } from 'react';

class Post extends Component {
    render() { 
        return (<div>
            <h5>{this.props.name?.length > 0 ? this.props.name : "Untitled Post"}</h5>
            <a className="btn btn-primary" href={this.props.link}>See On Site</a>
        </div>);
    }
}
 
export default Post;