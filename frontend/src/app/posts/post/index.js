import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {closeModal, openModal} from "../../shared-modal-content/actions";
import {editPost, addPost,addComments} from "./actions";
import {ActionsPanel} from "./actions-ui-panel/index";
import {connect} from "react-redux";
import AddIcon from 'react-icons/lib/md/add-circle-outline';
import './index.css';

class Post extends Component {

    static API_URL = process.env.REACT_APP_BACKEND;

    componentWillMount() {
        if (this.isPostDetailPage) {
            const id = this.props.match.params.id;
            this.fetchPostAndSaveInStore(id);
        }
    }

    fetchCommentsForPost(id) {
        const url = `${Post.API_URL}/posts/${id}/comments`;
        fetch(url, {headers: {'Authorization': '*'}})
            .then(res => {
                return ( res.json() )
            })
            .then(comments => {
                this.props.addComments(comments)
            });
    }

    fetchPostAndSaveInStore(id) {
        const url = `${Post.API_URL}/posts/${id}`;
        fetch(url, {headers: {'Authorization': '*'}})
            .then(res => {
                return ( res.json() )
            }).then(post => {
            this.props.addPost(post);
        }).then(() => {
            if (this.isPostDetailPage) this.fetchCommentsForPost(id)
        }).catch(error => console.error(error))
    }

    onDeleteElement(type, id) {
        const url = `${Post.API_URL}/${type}/${id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {'Authorization': '*'}
        }).then(res => {
            return (res.json())
        }).then(() => {
            if (type === 'posts') {
                this.props.history.push("/");
            } else {
                this.fetchCommentsForPost(this.props.singlePost.id);
            }
        }).catch(error => console.log(error))
    }

    onEditElement(type, element) {
        if (type === 'posts') this.props.editPost(this.props.singlePost);
        this.props.show({
            modalOpen: true,
            type: type === 'posts' ? 'edit-post' : 'edit-comment',
            postId: this.props.singlePost.id,
            commentId: element.id,
            commentBody: element.body
        });
    }

    onVote(type, id, action) {
        const url = `${Post.API_URL}/${type}/${id}`;
        fetch(url, {
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({option: action.toString()})
        }).then(res => {
            return (res.json())
        }).then(response => {
            const ID = type === 'posts' ? id : response.parentId;
            this.fetchPostAndSaveInStore(ID)
        }).catch(error => console.log(error))
    }

    onAddComment() {
        this.props.show({
            modalOpen: true,
            type: 'add-comment',
            postId: this.props.singlePost.id
        });
    }

    get isPostDetailPage() {
        return this.props.hasOwnProperty('match') && this.props.match.path === '/:category/:id'
    }

    render() {
        const {comments} = this.props;
        const post = this.isPostDetailPage ? this.props.singlePost : this.props.post;
        const {editedTitle, editedBody, isInEditMode} = this.isPostDetailPage ? this.props : {};
        return (
            <div>
                {post !== undefined && (
                    <div>
                        <div className={this.isPostDetailPage ? 'post-detail' : 'post'} key={post.id}>
                            <Link to={`/${post.category}/${post.id}`}>
                                <div className="post-link">
                                    <p>{editedTitle && isInEditMode ? editedTitle : post.title}</p>
                                    <small
                                        className="color--silver">{editedBody && isInEditMode ? editedBody : post.body}</small>
                                </div>
                            </Link>

                            <ActionsPanel delete={(type, id) => this.onDeleteElement(type, id)}
                                          edit={(type, element) => this.onEditElement(type, element)}
                                          onvote={(type, id, action) => this.onVote(type, id, action)}
                                          isDetailPage={this.isPostDetailPage}
                                          type={'posts'}
                                          element={post}/>

                        </div>
                        {(this.isPostDetailPage && comments !== undefined) && comments.map(comment => (
                            <div key={comment.id} className="post-comment attached--left">
                                <small className="color--silver">{comment.body}</small>

                                <ActionsPanel
                                    delete={(type, id) => this.onDeleteElement(type, id)}
                                    edit={(type, element) => this.onEditElement(type, element)}
                                    onvote={(type, id, action) => this.onVote(type, id, action)}
                                    isDetailPage={this.isPostDetailPage}
                                    type={'comments'}
                                    element={comment}/>
                            </div>
                        ))}
                        {this.isPostDetailPage && (
                            <div onClick={() => this.onAddComment()}
                                 className="post-comment post-comment--cta attached--right">
                                <small><AddIcon style={{'marginBottom': 3}} size={20}/> ADD COMMENT</small>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        modalOpen: state.modalReducer.modalOpen,
        editedTitle: state.postReducer.editedTitle,
        editedBody: state.postReducer.editedBody,
        isInEditMode: state.postReducer.isInEditMode,
        newComment: state.postReducer.newComment,
        singlePost: state.postReducer.post,
        comments: state.postReducer.comments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        editPost: (data, post) => dispatch(editPost(data, post)),
        addPost: (post) => dispatch(addPost(post)),
        addComments: (comments) => dispatch(addComments(comments)),
        show: (data) => dispatch(openModal(data)),
        hide: (data) => dispatch(closeModal(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
