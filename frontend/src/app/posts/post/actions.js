export const FETCH_POST = 'FETCH_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const EDIT_POST = 'EDIT_POST';

export function fetchPost (post) {
    return {
        type: FETCH_POST,
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
