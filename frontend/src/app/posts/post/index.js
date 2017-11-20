import React, { Component } from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {closeModal,openModal} from "../../navigation/actions";
import {editPost} from "./actions";
import {connect} from "react-redux";
import './index.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
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
                if (this.state.post.commentCount > 0) this.fetchCommentsForPost(id)
            })
    }

    deletePost() {
        const id = this.props.match.params.id;
        const url = `${Post.API_URL}/posts/${id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {'Authorization': '*'}
        })
            .then(res => {
                return(res.json())
            })
            .then(() => {
                this.props.history.push("/");
            })
    }

    onEditPost() {
        this.props.editPost(this.state.post);
        this.props.show({modalOpen: true});
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
        const {editedTitle,editedBody,isInEditMode} = this.isPostDetailPage ? this.props : {};
        return (
            <div>
                <div className={this.isPostDetailPage ? 'post-detail' : 'post'} key={post.id}>
                    <Link to={`/${post.category}/${post.id}`}>
                        <div className="post-link">
                            <p>{editedTitle && isInEditMode ? editedTitle : post.title}</p>
                            <small>{editedBody && isInEditMode ? editedBody : post.body}</small>
                        </div>
                    </Link>
                    <div className="post-info">
                        <small>{`Score: ${post.voteScore} `}<span>•</span></small>
                        <small>{`Author: ${post.author} `}<span>•</span></small>
                        <small>{`Comments: ${post.commentCount} `}<span>•</span></small>
                        <small>Created: <Moment fromNow>{post.timestamp}</Moment></small>
                        {this.isPostDetailPage && (
                            <span>
                                <small>•</small>
                                <small onClick={() => this.onEditPost()} className="actionable edit color--green"> EDIT </small>
                                <small><span>•</span></small>
                                <small onClick={() => this.deletePost()} className="actionable delete color--red"> DELETE</small>
                            </span>
                        )}
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

function mapStateToProps (state) {
    return {
        state,
        modalOpen: state.modalReducer.modalOpen,
        editedTitle: state.postReducer.editedTitle,
        editedBody: state.postReducer.editedBody,
        isInEditMode: state.postReducer.isInEditMode
    };
}

function mapDispatchToProps (dispatch) {
    return {
        editPost: (data,post) => dispatch(editPost(data,post)),
        show: (data) => dispatch(openModal(data)),
        hide: (data) => dispatch(closeModal(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
