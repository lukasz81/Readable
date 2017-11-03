import React, { Component } from 'react';

class Post extends Component {

    render() {
        const {post} = this.props;
        return (
            <div className="post" key={post.category}>
                <p>{post.title}</p>
                <small>{post.body}</small>
            </div>
        );
    }
}
export default Post;
