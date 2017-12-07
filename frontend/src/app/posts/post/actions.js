import {
    FETCH_POST,
    VOTE_POST,
    VOTE_COMMENT,
    DELETE_COMMENT,
    ADD_COMMENTS,
    EDITING_POST,
    EDITING_COMMENT,
    SAVE_COMMENT,
    ADD_NEW_COMMENT,
    IS_ON_DETAIL_PAGE
} from "./action-types";
import * as API from "../../api/index";

export function fetchPost(ID) {
    return (dispatch) => {
        API.fetchElements(`/posts/${ID}`)
            .then(post => dispatch({
                type: FETCH_POST,
                post
            }))
    };
}

export function voteOnPost(ID, action) {
    return (dispatch) => {
        API.postActions(`/posts/${ID}`,{option: action})
            .then(post => dispatch({
                type: VOTE_POST,
                action: action,
                post: post
            }))
    };
}

export function voteOnComment(ID, action) {
    return (dispatch) => {
        API.postActions(`/comments/${ID}`,{option: action})
            .then(comment => dispatch({
                type: VOTE_COMMENT,
                action: action,
                comment: comment
            }))
    };
}

export function deleteComment (ID) {
    return (dispatch) => {
        API.deleteElements(`/comments/${ID}`)
            .then(comment => dispatch({
                type: DELETE_COMMENT,
                comment
            }));
    }
}

export function addComments (ID) {
    return (dispatch) => {
        API.fetchElements(`/posts/${ID}/comments`)
            .then(comments => dispatch({
                    type: ADD_COMMENTS,
                    comments
                })
            );
    }
}

export function editPost (post) {
    return {
        type: EDITING_POST,
        post
    };
}

export function editComment (commentData) {
    return {
        type: EDITING_COMMENT,
        commentData
    };
}

export function saveComment (ID,body) {
    return (dispatch) => {
        API.editElements(`/comments/${ID}`,body)
            .then(comment => dispatch({
                type: SAVE_COMMENT,
                comment
            }))
    }
}

export function addNewComment (body) {
    return (dispatch) => {
        API.postActions('/comments',body)
            .then(comment => dispatch({
                type: ADD_NEW_COMMENT,
                comment
            }))
    }
}

export function isPostDetailPage (isPostDetailPage) {
    return {
        type: IS_ON_DETAIL_PAGE,
        isPostDetailPage
    };
}
