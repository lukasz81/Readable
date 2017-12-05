import {
    STORE_POSTS,
    ADD_TO_POSTS,
    SAVE_EDITED_POST,
    REMOVE_POST,
    TOGGLE_SORT,
    VOTE_POSTS
} from "./action-types";

import * as API from "../api";

let sortTypeIsScore = true;

export function storePosts (sortBy) {
    return (dispatch) => {
        API.fetchElements('/posts')
            .then(posts => dispatch({
                type: STORE_POSTS,
                posts: posts,
                sortBy
            }));
    }
}

export function addToPosts (body) {
    return (dispatch) => {
        API.postActions('/posts',body)
            .then(post => dispatch({
                type: ADD_TO_POSTS,
                post: post
            }));
    }
}

export function saveEditedPost (ID,body) {
    return (dispatch) => {
        API.editElements(`/posts/${ID}`,body)
            .then(post => dispatch({
                type: SAVE_EDITED_POST,
                post: post
            }));
    }
}

export function removeFromPosts (ID) {
    return (dispatch) => {
        API.deleteElements(`/posts/${ID}`)
            .then(post => dispatch({
                type: REMOVE_POST,
                post: post
            }));
    }
}

export function toggleSort () {
    return {
        type: TOGGLE_SORT,
        isScore: sortTypeIsScore = !sortTypeIsScore
    };
}

export function voteOnPosts(ID, action) {
    return (dispatch) => {
        API.postActions(`/posts/${ID}`,{option: action})
            .then(post => dispatch({
                type: VOTE_POSTS,
                action: action,
                post: post
            }))
    };
}