import React, {Component} from 'react';
import {closeModal} from "./actions";
import {savePost} from "../posts/post/actions";
import {connect} from "react-redux";
import {storePosts} from "../posts/actions";
import {addComment} from "../posts/post/actions";
import {AddOrEditPostForm} from './add-or-edit-post-form';
import {AddOrEditCommentForm} from './add-or-edit-comment-form'
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
        const {isInEditMode,postTitle,postBody,action,commentBody} = this.props;
        const bodyToShow = action === 'edit-post' ? postBody : commentBody;
        this.setState({
            title: isInEditMode ? postTitle : '',
            body: bodyToShow
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
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
        const post = this.state;
        if (this.checkIfFormIsValid(post) && !this.props.isInEditMode) {
            this.addPost(post);
        } else if (this.props.action === 'edit-comment') {
            this.editComment()
        } else if (this.props.action === 'edit-post') {
            this.editPost();
        } else if (this.props.action === 'add-comment') {
            const comment = {
              id: this.state.id,
              timestamp: this.state.timestamp,
              body: this.state.body,
              author: this.state.author,
              parentId: this.props.id
            };
            this.addCommentToPost(comment)
        } else {
            alert('Fill up all the fields please');
        }

    }

    addPost(post) {
        const url = `${process.env.REACT_APP_BACKEND}/posts`;
        const {sort,posts} = this.props;
        fetch(url, {
            method:'POST',
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        }).then(() => {
            const contentToAdd = posts ? posts.concat(post) : [post];
            this.props.addPosts(contentToAdd,sort);
            this.props.hide({modalOpen: false});
        }).catch(error => {console.log(error)})
    }

    addCommentToPost(comment) {
        const url = `${process.env.REACT_APP_BACKEND}/comments`;
        fetch(url, {
            method:'POST',
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        }).then(() => {
            this.props.addComment(comment);
            this.props.hide({modalOpen: false});
        }).catch(error => {console.log(error)})
    }

    editPost() {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${this.props.id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body
            })
        }).then(() => {
            this.props.savePost({
                title: this.state.title,
                body: this.state.body
            });
            this.props.hide({modalOpen: false})
        }).catch(error => {console.log(error)})
    }

    editComment() {
        const url = `${process.env.REACT_APP_BACKEND}/comments/${this.props.commentId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timestamp: Date.now(),
                body: this.state.body
            })
        }).then(() => {
            this.props.hide({modalOpen: false})
        }).catch(error => {console.log(error)})
    }

    render() {
        const {action} = this.props;
        return (
            <div>
                {action === 'add-comment' || action === 'edit-comment'  ? (
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
        sort: state.toggleSortReducer.sortBy,
        posts: state.postsReducer.posts,
        isInEditMode: state.postReducer.isInEditMode,
        postTitle: state.postReducer.postTitle,
        postBody: state.postReducer.postBody,
        id: state.postReducer.id || state.modalReducer.parentId,
        action: state.modalReducer.actionType,
        commentBody: state.modalReducer.commentBody,
        commentId: state.modalReducer.commentId
    };
}

function mapDispatchToProps (dispatch) {
    return {
        hide: (data) => dispatch(closeModal(data)),
        addPosts: (data) => dispatch(storePosts(data)),
        savePost: (data) => dispatch(savePost(data)),
        addComment: (data) => dispatch(addComment(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalContent);