import React, { Component } from 'react';
import Post from './Post';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup } from 'react-bootstrap';
import './index.css';
import { FaPaperclip, FaYoutube, FaReddit, FaTumblr, FaTwitter, FaMusic } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';

class Site extends Component {
    render() { 
        return (<div>
            <IconContext.Provider value ={{ color: "cornflowerblue"}}>
            <Card>
                <Card.Header>
            <Card.Body><h3 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><a href={this.props.link}><FaPaperclip/></a>ㅤ{this.props.name}ㅤ
            {this.nameSwitch(this.props.name)}</h3> </Card.Body>
            </Card.Header>
            <ListGroup.Item> 
            <ul>{ this.props.posts.map(post => {
                return <Post name={post.name} link={post.link} key={post.link} />;
            }) }
            </ul>
            </ListGroup.Item>
            </Card>
            </IconContext.Provider>
        </div>);
    }

    nameSwitch(name) {
        switch(name) {
            case 'YouTube':
                return <IconContext.Provider value ={{ color: "red"}}>< FaYoutube className="d-flex justify-content-between"/></IconContext.Provider>;
            case 'Reddit':
                return <IconContext.Provider value ={{ color: "red"}}>< FaReddit className="d-flex justify-content-between"/></IconContext.Provider>;
            case 'Tumblr':
                return < FaTumblr className="d-flex justify-content-between"/>;
            case 'Genius':
                return <IconContext.Provider value ={{ color: "black"}}>< FaMusic className="d-flex justify-content-between"/></IconContext.Provider>;
            case 'Twitter':
                return < FaTwitter />;
            default:
                return <IconContext.Provider value ={{ color: "cornflowerblue"}}>< FaPaperclip className="d-flex justify-content-between"/></IconContext.Provider>;
        }
    }
}
 
export default Site;