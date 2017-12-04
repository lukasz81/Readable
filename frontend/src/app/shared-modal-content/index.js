import React, {Component} from 'react';
import {toggleModal} from "./actions";
import {savePost,saveComment} from "../posts/post/actions";
import {connect} from "react-redux";
import {addToPosts} from "../posts/actions";
import {AddOrEditPostForm} from './add-or-edit-post-form';
import {AddOrEditCommentForm} from './add-or-edit-comment-form';
import * as API from "../api";
import './index.css';

class ModalContent extends Component {
    constructor(props) {
        super(props);
        const cuid = require('cuid');
        this.state = {
            id: cuid(),
            timestamp: Date.now(),
            title: '',
            body: '',
            author: '',
            category: 'react',
            voteScore: 0,
            deleted: false,
            commentCount: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const {postTitle,postBody,action,commentBody} = this.props;
        this.setState({
            title: action === 'edit-post' ? postTitle : '',
            body: action === 'edit-post' ? postBody : commentBody
        })
    }

    handleInputChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    checkIfFormIsValid(post) {
        let isValid = true;
        Object.keys(post).forEach( key => {
            if (post[key] === '') isValid = false;
        });
        return isValid;
    }

    handleSubmit(event) {
        event.preventDefault();
        const {action} = this.props;
        switch (action) {
            case 'edit-comment' :
                return this.editComment();
            case 'edit-post' :
                return this.editPost();
            case 'add-comment' :
                const comment = {
                    id: this.state.id,
                    timestamp: this.state.timestamp,
                    body: this.state.body,
                    author: this.state.author,
                    parentId: this.props.post.id
                };
                return this.addCommentToPost(comment);
            default :
                if (this.checkIfFormIsValid(this.state)) {
                    this.fetchPost(this.state);
                } else {
                    alert('Fill up all the fields please');
                }
        }

    }

    fetchPost(post) {
        API.postActions('/posts',post)
            .then(post => {
                this.props.addToPosts(post);
                this.props.hide({modalOpen: false});
            })
    }

    addCommentToPost(comment) {
        API.postActions('/comments',comment)
            .then(comment => {
                this.props.saveComment(comment);
                this.props.hide({modalOpen: false});
            })
    }

    editPost() {
        const {detailPage,id} = this.props;
        const body = {
            title: this.state.title,
            body: this.state.body
        };
        API.editElements(`/posts/${id}`,body)
            .then(post => {
                detailPage ? this.props.savePost(post) : this.props.addToPosts(post);
                this.props.hide({modalOpen: false});
            });
    }

    editComment() {
        const body = {
            timestamp: Date.now(),
            body: this.state.body
        };
        API.editElements(`/comments/${this.props.commentId}`,body)
            .then(comment => {
                this.props.saveComment(comment);
                this.props.hide({modalOpen: false})
            })
    }

    render() {
        const {action} = this.props;
        return (
            <div>
                {action === 'add-comment' || action === 'edit-comment' ? (
                    <AddOrEditCommentForm
                        handleSubmit={this.handleSubmit}
                        handleInputChange={this.handleInputChange}
                        {...this.state}
                        {...this.props} />
                ) : (
                    <AddOrEditPostForm
                    handleSubmit={this.handleSubmit}
                    handleInputChange={this.handleInputChange}
                    {...this.state}
                    {...this.props} />
                )}
            </div>
        );
    }
}
function mapStateToProps (state) {
    return {
        ///posts
        sort: state.postsReducer.sortBy,
        posts: state.postsReducer.posts,
        ///post
        postTitle: state.postReducer.postData.postTitle,
        postBody: state.postReducer.postData.postBody,
        id: state.postReducer.postData.postId,
        commentBody: state.postReducer.commentData.commentBody,
        commentId: state.postReducer.commentData.commentId,
        comments: state.postReducer.comments,
        post: state.postReducer.post,
        detailPage: state.postReducer.isPostDetailPage,
        ///modal
        action: state.modalReducer.actionType
    };
}

function mapDispatchToProps (dispatch) {
    return {
        hide: (data) => dispatch(toggleModal(data)),
        addToPosts: (post) => dispatch(addToPosts(post)),
        savePost: (post) => dispatch(savePost(post)),
        saveComment: (comment) => dispatch(saveComment(comment))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalContent);