import React, {Component} from 'react';
import {toggleModal} from "./actions";
import {fetchPost,saveComment,addNewComment} from "../posts/post/actions";
import {connect} from "react-redux";
import {addToPosts,saveEditedPost} from "../posts/actions";
import {AddOrEditPostForm} from './add-or-edit-post-form';
import {AddOrEditCommentForm} from './add-or-edit-comment-form';
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
                const newComment = {
                    id: this.state.id,
                    timestamp: this.state.timestamp,
                    body: this.state.body,
                    author: this.state.author,
                    parentId: this.props.post.id
                };
                return this.addCommentToPost(newComment);
            default :
                if (this.checkIfFormIsValid(this.state)) {
                    this.addPost(this.state);
                } else {
                    alert('Fill up all the fields please');
                }
        }

    }

    addPost(post) {
        this.props.addToPosts(post);
        this.props.hide({});
    }

    addCommentToPost(newComment) {
        this.props.hide({});
        this.props.addNewComment(newComment);
    }

    editPost() {
        const {id} = this.props;
        const body = {title: this.state.title, body: this.state.body};
        this.props.hide({});
        this.props.saveEditedPost(id,body)
    }

    editComment() {
        const body = {
            timestamp: Date.now(),
            body: this.state.body
        };
        this.props.saveComment(this.props.commentId,body);
        this.props.hide({})
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
        saveEditedPost: (id,body) => dispatch(saveEditedPost(id,body)),
        fetchPost: (post) => dispatch(fetchPost(post)),
        saveComment: (id,body) => dispatch(saveComment(id,body)),
        addNewComment: (comment) => dispatch(addNewComment(comment))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalContent);