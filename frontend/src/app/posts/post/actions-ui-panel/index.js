import React, {Component} from 'react';
import Moment from 'react-moment';
import {addToPosts,removeFromPosts} from "../../actions";
import {editPost,editComment,deleteComment,savePost,saveComment} from "../actions";
import {toggleModal} from "../../../shared-modal-content/actions";
import {connect} from "react-redux";
import DownVoteIcon from 'react-icons/lib/ti/thumbs-down';
import UpVoteIcon from 'react-icons/lib/ti/thumbs-up';
import EditIcon from 'react-icons/lib/ti/edit';
import DeleteIcon from 'react-icons/lib/ti/trash';
import * as API from "../../../api/index";

class ActionsPanel extends Component {

    get isPostDetailPage() {
        return this.props.isDetailPage
    }

    onVote(type, id, action) {
        API.postActions(`/${type}/${id}`,{option: action})
            .then(response => {
                if (type === 'posts') {
                    this.isPostDetailPage ? this.props.savePost(response) : this.props.addToPosts(response);
                } else {this.props.saveComment(response);}
            })
    }

    onDeleteElement(type, id) {
        const sure = window.confirm(`Are you sure you want to delete the ${type.slice(0, -1)}`);
        if (sure) {
            API.deleteElements(`/${type}/${id}`)
                .then(element => {
                    if (type === 'posts') {
                        if (this.isPostDetailPage) this.props.history.push("/");
                        this.props.removeFromPosts(element)
                    } else {
                        this.props.deleteComment(element);
                    }
                });
        }
    }

    onEditElement(type, element) {
        this.props.toggleModal({
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
                <small className="color--silver-light">{`Score: ${element.voteScore}`}<span> • </span></small>
                <small className="color--silver-light">{`Author: ${element.author}`}<span> • </span></small>
                {element.commentCount !== undefined && (
                    <small className="color--silver-light">{`Comments: ${element.commentCount}`}<span> • </span></small>
                )}
                <small className="color--silver-light">Created: <Moment fromNow>{element.timestamp}</Moment></small>
                <span>
                    <br/>
                    <small onClick={() => this.onEditElement(type, element)}
                           className="actionable edit color--silver"
                           title="Edit">
                        <EditIcon size={20}/>
                    </small>
                    <small onClick={() => this.onDeleteElement(type, element.id)}
                           className="actionable delete color--silver"
                           title="Delete" >
                        <DeleteIcon size={20}/>
                    </small>
                    <small onClick={() => this.onVote(type, element.id, 'upVote')}
                           className="actionable delete color--silver"
                           title="Upvote">
                        <UpVoteIcon size={20}/>
                    </small>
                    <small onClick={() => this.onVote(type, element.id, 'downVote')}
                           className="actionable delete color--silver"
                           title="Downvote">
                        <DownVoteIcon size={20}/>
                    </small>
                </span>
            </div>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToPosts: (post) => dispatch(addToPosts(post)),
        savePost: (post) => dispatch(savePost(post)),
        editPost: (post) => dispatch(editPost(post)),
        editComment: (comment) => dispatch(editComment(comment)),
        saveComment: (comment) => dispatch(saveComment(comment)),
        toggleModal: (data) => dispatch(toggleModal(data)),
        deleteComment: (comment) => dispatch(deleteComment(comment)),
        removeFromPosts: (post) => dispatch(removeFromPosts(post))
    };
}

export default connect(null,mapDispatchToProps)(ActionsPanel);