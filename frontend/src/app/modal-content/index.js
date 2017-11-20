import React, {Component} from 'react';
import {closeModal} from "../navigation/actions";
import {savePost} from "../posts/post/actions";
import {connect} from "react-redux";
import {storePosts} from "../posts/actions";
import {Form} from './form';
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
        const {isInEditMode,postTitle,postBody} = this.props;
        this.setState({
            title: isInEditMode ? postTitle : '',
            body: isInEditMode ? postBody : ''
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
        } else if (this.props.isInEditMode) {
            this.editPost();
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
        }).then( () => {
            this.props.savePost({
                title: this.state.title,
                body: this.state.body
            });
            this.props.hide({modalOpen: false})
        })
          .catch(error => {console.log(error)})
    }

    render() {
        return (
            <div>
                <Form
                    handleSubmit={this.handleSubmit}
                    handleInputChange={this.handleInputChange}
                    {...this.state}
                    {...this.props} />
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
        id: state.postReducer.id
    };
}

function mapDispatchToProps (dispatch) {
    return {
        hide: (data) => dispatch(closeModal(data)),
        addPosts: (data) => dispatch(storePosts(data)),
        savePost: (data) => dispatch(savePost(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalContent);