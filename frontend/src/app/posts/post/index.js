import React, { Component } from 'react';

class Post extends Component {

    convertToTime(unixPast) {
        const now = Date.now();
        const delta = Math.abs(now - unixPast) / 1000;
        const days = Math.floor(delta / 86400);
        const years = Math.abs(days / 365);
        const months = Math.floor(12 * years);
        return months;
    }

    render() {
        const {post} = this.props;
        return (
            <div className="post" key={post.category}>
                <p>{post.title}</p>
                <small>{post.body}</small>
                <div className="info">
                    <small>{`score: ${post.voteScore} •`}</small>
                    <small>{`author: ${post.author} •`}</small>
                    <small>{`comments: ${post.commentCount} •`}</small>
                    <small>{`created: ${this.convertToTime(post.timestamp)} months ago`}</small>
                </div>
            </div>
        );
    }
}

export default Post;
