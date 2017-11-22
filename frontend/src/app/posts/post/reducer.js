import {
    ADD_POST,
    ADD_COMMENTS,
    EDIT_POST,
} from "./actions";

function postReducer(state = { isInEditMode: false }, action) {
    switch (action.type) {
        case ADD_POST :
            return {
                ...state,
                isInEditMode: false,
                editedTitle: null,
                editedBody: null,
                post: action.post
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