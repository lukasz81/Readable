import React, {Component} from 'react';
import {closeModal} from "./actions";
import {savePost,saveComment} from "../posts/post/actions";
import {connect} from "react-redux";
import {addToPosts} from "../posts/actions";
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
        const {postTitle,postBody,action,commentBody} = this.props;
        this.setState({
            title: action === 'edit-post' ? postTitle : '',
            body: action === 'edit-post' ? postBody : commentBody
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
        const {action} = this.props;
        if (this.checkIfFormIsValid(post) && !action) {
            this.fetchPost(post);
        } else if (action === 'edit-comment') {
            this.editComment();
        } else if (action === 'edit-post') {
            this.editPost();
        } else if (action === 'add-comment') {
            const comment = {
              id: this.state.id,
              timestamp: this.state.timestamp,
              body: this.state.body,
              author: this.state.author,
              parentId: this.props.post.id
            };
            this.addCommentToPost(comment)
        } else {
            alert('Fill up all the fields please');
        }

    }

    fetchPost(post) {
        const url = `${process.env.REACT_APP_BACKEND}/posts`;
        fetch(url, {
            method:'POST',
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        }).then(res => {
            return res.json()
        }).then(post => {
            this.props.addToPosts(post);
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
        }).then(res => {
            return res.json()
        }).then(comment => {
            this.props.saveComment(comment);
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
        }).then(res => {
            return res.json()
        }).then(post => {
            this.props.addToPosts(post);
            this.props.hide({modalOpen: false});
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
        }).then(res => {
            return res.json()
        }).then(comment => {
            this.props.saveComment(comment);
            this.props.hide({modalOpen: false})
        }).catch(error => {console.log(error)})
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
    console.log('shared mapStateToProps => ', state);
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
        ///modal
        action: state.modalReducer.actionType
    };
}

function mapDispatchToProps (dispatch) {
    return {
        hide: (data) => dispatch(closeModal(data)),
        addToPosts: (post) => dispatch(addToPosts(post)),
        savePost: (post) => dispatch(savePost(post)),
        saveComment: (comment) => dispatch(saveComment(comment))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalContent);