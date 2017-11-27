import {
    SAVE_POST,
    DELETE_COMMENT,
    ADD_COMMENTS,
    EDIT_POST,
    EDIT_COMMENT,
    SAVE_COMMENT
} from "./action-types";

function postReducer(state = {
        postData:{postTitle: ''},
        commentData:{commentBody: ''},
        comments: []
    }, action) {
    switch (action.type) {
        case SAVE_POST :
            return {
                ...state,
                post: action.post
            };
        case DELETE_COMMENT :
            return {
                ...state,
                comments: state.comments.filter(comment => {
                    return comment.id !== action.comment.id
                })
            };
        case ADD_COMMENTS :
            return {
                ...state,
                comments: action.comments
            };
        case EDIT_POST :
            return {
                ...state,
                postData: action.post
            };
        case EDIT_COMMENT :
            return {
                ...state,
                commentData: action.commentData
            };
        case SAVE_COMMENT :
            return {
                ...state,
                comments: state.comments.filter(comment => {
                    return comment.id !== action.comment.id
                }).concat(action.comment)
            };
        default :
            return state
    }
}

export {postReducer}