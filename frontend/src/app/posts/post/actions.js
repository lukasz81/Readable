export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const SAVE_POST = 'SAVE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export function addPost (post) {
    return {
        type: ADD_POST,
        post
    };
}

export function editPost (post) {
    return {
        type: EDIT_POST,
        post
    };
}

export function savePost (data) {
    return {
        type: SAVE_POST,
        data
    };
}

export function addComment (comment) {
    return {
        type: ADD_COMMENT,
        comment
    };
}

export function editComment (comment) {
    return {
        type: ADD_COMMENT,
        comment
    };
}
