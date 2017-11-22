export const ADD_POST = 'ADD_POST';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const EDIT_POST = 'EDIT_POST';

export function addPost (post) {
    return {
        type: ADD_POST,
        post
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
