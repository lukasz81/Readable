import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {toggleModal} from "../../shared-modal-content/actions";
import {editPost, fetchPost, addComments, deleteComment, isOnDetailPage} from "./actions";
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

    get ID() {
        return this.state.id;
    }

    get isPostDetailPage() {
        return this.props.hasOwnProperty('match') && this.props.match.path === '/:category/:id'
    }

    componentWillMount() {
        if (this.isPostDetailPage) {
            this.fetchPostAndSaveInStore(this.ID);
            this.props.isOnDetailPage(this.isPostDetailPage);
        }
    }

    fetchPostAndSaveInStore() {
        if (this.isPostDetailPage) {
            this.props.fetchPost(this.ID);
            this.addCommentsForPost();
        }
    }

    addCommentsForPost() {
        this.props.addComments(this.ID)
    }

    onAddComment() {
        this.props.toggleModal({
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
                                <small><AddIcon style={{'marginBottom': 3}} size={20}/> ADD A COMMENT</small>
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
        editedTitle: state.postReducer.editedTitle,
        editedBody: state.postReducer.editedBody,
        singlePost: state.postsReducer.post || state.postReducer.post,
        comments: state.postReducer.comments,
        posts: state.postsReducer.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        editPost: (data, post) => dispatch(editPost(data, post)),
        fetchPost: (post) => dispatch(fetchPost(post)),
        deleteComment: (comment) => dispatch(deleteComment(comment)),
        addComments: (comments) => dispatch(addComments(comments)),
        storePosts: (posts,sortBy) => dispatch(storePosts(posts,sortBy)),
        toggleModal: (data) => dispatch(toggleModal(data)),
        isOnDetailPage: (boolean) => dispatch(isOnDetailPage(boolean))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
