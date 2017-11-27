import {SAVE_POST} from "./action-types";
import {DELETE_COMMENT} from "./action-types";
import {ADD_COMMENTS} from "./action-types";
import {EDIT_POST} from "./action-types";
import {EDIT_COMMENT} from "./action-types";
import {SAVE_COMMENT} from "./action-types";

export function savePost (post) {
    return {
        type: SAVE_POST,
        post
    };
}

export function deleteComment (comment) {
    return {
        type: DELETE_COMMENT,
        comment
    };
}

export function addComments (comments) {
    return {
        type: ADD_COMMENTS,
        comments
    };
}

export function editPost (post) {
    return {
        type: EDIT_POST,
        post
    };
}

export function editComment (commentData) {
    return {
        type: EDIT_COMMENT,
        commentData
    };
}

export function saveComment (comment) {
    return {
        type: SAVE_COMMENT,
        comment
    };
}
