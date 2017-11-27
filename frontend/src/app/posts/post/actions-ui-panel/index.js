import React, {Component} from 'react';
import Moment from 'react-moment';
import {addToPosts,removeFromPosts} from "../../actions";
import {editPost,editComment,deleteComment,savePost,saveComment} from "../actions";
import {openModal} from "../../../shared-modal-content/actions";
import {connect} from "react-redux";

class ActionsPanel extends Component {

    get isPostDetailPage() {
        return this.props.isDetailPage
    }

    onVote(type, id, action) {
        const url = `${process.env.REACT_APP_BACKEND}/${type}/${id}`;
        fetch(url, {
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({option: action.toString()})
        }).then(res => {
            return res.json()
        }).then(response => {
            if (type === 'posts') {
                if (!this.isPostDetailPage) {
                    this.props.addToPosts(response);
                } else {
                    this.props.savePost(response);
                }
            } else {
                this.props.saveComment(response);
            }
        }).catch(error => console.log(error))
    }

    onDeleteElement(type, id) {
        const url = `${process.env.REACT_APP_BACKEND}/${type}/${id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {'Authorization': '*'}
        }).then(res => {
            return res.json()
        }).then(element => {
            if (type === 'posts') {
                if (this.isPostDetailPage) this.props.history.push("/");
                this.props.removeFromPosts(element)
            } else {
                this.props.deleteComment(element);
            }
        }).catch(error => console.log(error))
    }

    onEditElement(type, element) {
        this.props.showModal({
            modalOpen: true,
            type: type === 'posts' ? 'edit-post' : 'edit-comment'
        });
        if (type === 'posts') {
            this.props.editPost({
                postId: element.id,
                postBody: element.body,
                postTitle: element.title
            });
        } else {
            this.props.editComment({
                commentId: element.id,
                commentBody: element.body
            });
        }

    }

    render() {
        const {element, type} = this.props;
        return (
            <div className="post-info">
                <small className="color--silver-light">{`Score: ${element.voteScore} `}<span>•</span></small>
                <small className="color--silver-light">{`Author: ${element.author} `}<span>•</span></small>
                {element.commentCount !== undefined && (
                    <small className="color--silver-light">{`Comments: ${element.commentCount} `}<span>•</span></small>
                )}
                <small className="color--silver-light">Created: <Moment fromNow>{element.timestamp}</Moment></small>
                <span>
                    <br/>
                    <small onClick={() => this.onEditElement(type, element)} className="actionable edit color--green"> EDIT </small>
                    <small><span>•</span></small>
                    <small onClick={() => this.onDeleteElement(type, element.id)} className="actionable delete color--red"> DELETE</small>
                    <small><span>•</span></small>
                    <small onClick={() => this.onVote(type, element.id, 'upVote')} className="actionable delete color--green"> UPVOTE</small>
                    <small><span>•</span></small>
                    <small onClick={() => this.onVote(type, element.id, 'downVote')} className="actionable delete color--red"> DOWNVOTE</small>
                </span>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        post: state.postReducer.post,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToPosts: (post) => dispatch(addToPosts(post)),
        savePost: (post) => dispatch(savePost(post)),
        editPost: (post) => dispatch(editPost(post)),
        editComment: (comment) => dispatch(editComment(comment)),
        saveComment: (comment) => dispatch(saveComment(comment)),
        showModal: (data) => dispatch(openModal(data)),
        deleteComment: (comment) => dispatch(deleteComment(comment)),
        removeFromPosts: (post) => dispatch(removeFromPosts(post))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ActionsPanel);