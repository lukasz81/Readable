import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {closeModal, openModal} from "../../shared-modal-content/actions";
import {editPost, savePost, addComments, deleteComment} from "./actions";
import {storePosts} from "../actions";
import ActionsPanel from "./actions-ui-panel/index";
import {connect} from "react-redux";
import AddIcon from 'react-icons/lib/md/add-circle-outline';
import './index.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            id: this.props.match ? this.props.match.params.id : null
        }
    }

    static API_URL = process.env.REACT_APP_BACKEND;

    get ID() {
        return this.state.id;
    }

    get isPostDetailPage() {
        return this.props.hasOwnProperty('match') && this.props.match.path === '/:category/:id'
    }

    componentWillMount() {
        if (this.isPostDetailPage) this.fetchPostAndSaveInStore(this.ID);
    }

    fetchPostAndSaveInStore() {
        const url = `${Post.API_URL}/posts/${this.ID}`;
        fetch(url, {headers: {'Authorization': '*'}})
            .then(res => {
                return (res.json())
            }).then(post => {
                this.props.savePost(post);
            }).then(() => {
                if (this.isPostDetailPage) this.fetchCommentsForPost()
            }).catch(error => console.error(error))
    }

    fetchCommentsForPost() {
        const url = `${Post.API_URL}/posts/${this.ID}/comments`;
        fetch(url, {headers: {'Authorization': '*'}})
            .then(res => {
                return (res.json())
            })
            .then(comments => {
                this.props.addComments(comments)
            });
    }

    onAddComment() {
        this.props.show({
            modalOpen: true,
            type: 'add-comment'
        });
    }

    render() {
        const {comments} = this.props;
        const post = this.isPostDetailPage ? this.props.singlePost : this.props.post;
        const {editedTitle, editedBody, isInEditMode} = this.isPostDetailPage ? this.props : {};
        return (
            <div>
                {post && post.deleted === false ? (
                    <div>
                        <div className={this.isPostDetailPage ? 'post-detail' : 'post'} key={post.id}>
                            <Link to={`/${post.category}/${post.id}`}>
                                <div className="post-link">
                                    <p>{editedTitle && isInEditMode ? editedTitle : post.title}</p>
                                    <small
                                        className="color--silver">{editedBody && isInEditMode ? editedBody : post.body}
                                    </small>
                                </div>
                            </Link>

                            <ActionsPanel
                                history={this.props.history}
                                isDetailPage={this.isPostDetailPage}
                                type={'posts'}
                                element={post}/>
                        </div>
                        {(this.isPostDetailPage && comments !== undefined) && comments.map(comment => (
                            <div key={comment.id} className="post-comment attached--left">
                                <small className="color--silver">{comment.body}</small>
                                <ActionsPanel
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
                ) : (
                    <p>This post has been deleted</p>
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
        comments: state.postReducer.comments,
        posts: state.postsReducer.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        editPost: (data, post) => dispatch(editPost(data, post)),
        savePost: (post) => dispatch(savePost(post)),
        deleteComment: (comment) => dispatch(deleteComment(comment)),
        addComments: (comments) => dispatch(addComments(comments)),
        storePosts: (posts,sortBy) => dispatch(storePosts(posts,sortBy)),
        show: (data) => dispatch(openModal(data)),
        hide: (data) => dispatch(closeModal(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
