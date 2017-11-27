export const SAVE_POST = 'SAVE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const SAVE_COMMENT = 'SAVE_COMMENT';

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

export function addNewComment (comment) {
    return {
        type: SAVE_COMMENT,
        comment
    };
}
