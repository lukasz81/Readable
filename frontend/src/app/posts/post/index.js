import React, { Component } from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';

class Post extends Component {

    state = {
        post: ''
    };

    componentWillMount() {
        if (this.isPostDetailPage) {
            const id = this.props.match.params.id;
            const url = `${process.env.REACT_APP_BACKEND}/posts/${id}`;
            fetch(url, {headers: {'Authorization': '*'}})
                .then(res => {
                    return ( res.json() )
                })
                .then(post => {
                    this.setState({
                        post: post
                    })
                });
        }
    }

    get isPostDetailPage() {
        return this.props.hasOwnProperty('match') && this.props.match.path === '/:category/:id'
    }

    render() {
        const {post} = this.isPostDetailPage ? this.state : this.props;
        return (
            <div className="post" key={post.id}>
                <Link to={`/${post.category}/${post.id}`}>
                    <div className="post-link">
                        <p>{post.title}</p>
                        <small>{post.body}</small>
                        <div className="info">
                            <small>{`Score: ${post.voteScore} `}<span>•</span></small>
                            <small>{`Author: ${post.author} `}<span>•</span></small>
                            <small>{`Comments: ${post.commentCount} `}<span>•</span></small>
                            <small>Created: <Moment fromNow>{post.timestamp}</Moment></small>
                        </div>
                    </div>
                </Link>
                <div className="post-nav">

                </div>
            </div>
        );
    }
}

export default Post;
