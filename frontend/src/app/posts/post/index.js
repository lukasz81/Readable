import React, { Component } from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {closeModal,openModal} from "../../shared-modal-content/actions";
import {editPost} from "./actions";
import {Comment} from "./comment"
import {ActionsPanel} from "./actions-ui-panel/index";
import {connect} from "react-redux";
import AddIcon from 'react-icons/lib/md/add-circle-outline';
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

    componentWillReceiveProps(newProps) {
        if (!newProps.modalOpen) this.fetchCommentsForPost(this.state.post.id)
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
            }).then(post => {
                this.setState({ post: post })
            }).then(() => {
                if (this.state.post.commentCount > 0) this.fetchCommentsForPost(id)
            }).catch(error => console.log(error))
    }

    onDeleteElement(type,id) {
        const url = `${Post.API_URL}/${type}/${id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {'Authorization': '*'}
        }).then(res => {
            return(res.json())
        }).then(() => {
            if (type === 'posts') {
                this.props.history.push("/");
            } else {
                this.fetchCommentsForPost(this.state.post.id);
            }
        }).catch(error => console.log(error))
    }

    onEditElement(type,element) {
        if (type === 'posts') this.props.editPost(this.state.post);
        this.props.show({
            modalOpen: true,
            type: type === 'posts' ? 'edit-post' : 'edit-comment',
            postId: this.state.post.id,
            commentId: element.id,
            commentBody: element.body
        });
    }

    onAddComment() {
        this.props.show({
            modalOpen: true,
            type: 'add-comment',
            postId: this.state.post.id
        });
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
                            <small className="color--silver">{editedBody && isInEditMode ? editedBody : post.body}</small>
                        </div>
                    </Link>

                    <ActionsPanel key={post.id}
                                  delete={(type,id) => this.onDeleteElement(type,id)}
                                  edit={(type,element) => this.onEditElement(type,element)}
                                  isDetailPage={this.isPostDetailPage}
                                  element={post}/>

                </div>
                {this.hasComments && comments.map( element => (
                    <div className="post-comment attached--left">
                        <small>{element.body}</small>

                        <ActionsPanel key={element.id}
                                 delete={(type,id) => this.onDeleteElement(type,id)}
                                 edit={(type,element) => this.onEditElement(type,element)}
                                 isDetailPage={this.isPostDetailPage}
                                 element={element}/>

                    </div>
                ))}
                {this.isPostDetailPage && (
                    <div onClick={() => this.onAddComment()} className="post-comment post-comment--cta attached--right">
                        <small><AddIcon style={{'marginBottom': 3}} size={20}/> ADD COMMENT</small>
                    </div>
                )}
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
        isInEditMode: state.postReducer.isInEditMode,
        newComment: state.postReducer.newComment
    };
}

function mapDispatchToProps (dispatch) {
    return {
        editPost: (data,post) => dispatch(editPost(data,post)),
        show: (data) => dispatch(openModal(data)),
        hide: (data) => dispatch(closeModal(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
