import React, {Component} from 'react';
import './index.css';
import {closeModal} from "../navigation/actions";
import {connect} from "react-redux";
import {storePosts} from "../posts/actions";
import {Form} from './form';

class AddPost extends Component {
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

    handleInputChange(event) {
        console.log('event ',event);
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
        const post = JSON.stringify(this.state);
        if (this.checkIfFormIsValid(this.state)) {
            this.addPost(post);
            this.props.hide({modalOpen: false});
        } else {
            alert('Fill up all the fields please');
        }

    }

    addPost(post) {
        const url = `${process.env.REACT_APP_BACKEND}/posts`;
        fetch(url, {
            method:'POST',
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            body: post
          }).catch(error => {console.log(error)})
    }

    render() {
        return (
            <Form
                handleSubmit={this.handleSubmit}
                handleInputChange={this.handleInputChange}
                props={this.state} />
        );
    }
}
function mapStateToProps (state) {
    return {state};
}

function mapDispatchToProps (dispatch) {
    return {
        hide: (data) => dispatch(closeModal(data)),
        storeFetchedPosts: (data) => dispatch(storePosts(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPost);