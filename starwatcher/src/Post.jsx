import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FaPaperclip } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';

class Post extends Component {
    render() { 
        return (<div>
            <IconContext.Provider value ={{ color: "cornflowerblue"}}>
            <ListGroup.Item>
            <h5><a href={this.props.link}><FaPaperclip/></a> {this.props.name}</h5>
            </ListGroup.Item>
            </IconContext.Provider>
        </div>);
    }
}
 
export default Post;