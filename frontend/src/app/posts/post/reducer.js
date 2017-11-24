import {
    FETCH_POST,
    DELETE_COMMENT,
    ADD_COMMENTS,
    EDIT_POST,
} from "./actions";

function postReducer(state = { isInEditMode: false }, action) {
    console.log('postReducer => ',action,state);
    switch (action.type) {
        case FETCH_POST :
            return {
                ...state,
                isInEditMode: false,
                editedTitle: null,
                editedBody: null,
                post: action.post
            };
        case DELETE_COMMENT :
            return {
                ...state,
                comments: state.comments.filter( comment => {
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
                isInEditMode: true,
                postTitle: action.post.title,
                postBody: action.post.body,
                id: action.post.id,
                editedTitle: null,
                editedBody: null
            };
        default :
            return state
    }
}

export {postReducer}