import React, { Component } from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import './index.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            comments: []
        };
    }

    static API_URL = process.env.REACT_APP_BACKEND;

    componentWillMount() {
        if (this.isPostDetailPage) {
            const id = this.props.match.params.id;
            this.fetchPostAndSaveInState(id);
        }
    }

    fetchCommentsForPost(id) {
        const url = `${Post.API_URL}/posts/${id}/comments`;
        fetch(url, {headers: {'Authorization': '*'}})
            .then(res => {
                return ( res.json() )
            })
            .then(comments => {
                this.setState({ comments: comments })
            });
    }

    fetchPostAndSaveInState(id) {
        const url = `${Post.API_URL}/posts/${id}`;
        fetch(url, {headers: {'Authorization': '*'}})
            .then(res => {
                return ( res.json() )
            })
            .then(post => {
                this.setState({ post: post })
            })
            .then(() => {
                const {commentCount} = this.state.post;
                if (commentCount > 0) this.fetchCommentsForPost(id)
            })
    }

    get isPostDetailPage() {
        return this.props.hasOwnProperty('match') && this.props.match.path === '/:category/:id'
    }

    get hasComments() {
        return this.state.post.commentCount > 0;
    }

    render() {
        const {post} = this.isPostDetailPage ? this.state : this.props;
        const {comments} = this.state;
        console.log(this.state);
        return (
            <div>
                <div className="post" key={post.id}>
                    <Link to={`/${post.category}/${post.id}`}>
                        <div className="post-link">
                            <p>{post.title}</p>
                            <small>{post.body}</small>
                        </div>
                    </Link>
                    <div className="post-info">
                        <small>{`Score: ${post.voteScore} `}<span>•</span></small>
                        <small>{`Author: ${post.author} `}<span>•</span></small>
                        <small>{`Comments: ${post.commentCount} `}<span>•</span></small>
                        <small>Created: <Moment fromNow>{post.timestamp}</Moment> <span>•</span></small>
                        <small className="actionable edit color--green"> EDIT </small>
                        <small><span>•</span></small>
                        <small className="actionable delete color--red"> DELETE</small>
                    </div>
                </div>
                {this.hasComments && comments.map( comment => (
                    <div key={comment.id} className="post-comment">
                        <small>{comment.body}</small>
                    </div>
                ))}
            </div>
        );
    }
}

export default Post;
