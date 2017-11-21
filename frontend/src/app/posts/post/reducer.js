import {
    ADD_POST,
    EDIT_POST,
    SAVE_POST,
    ADD_COMMENT,
    EDIT_COMMENT
} from "./actions";

function postReducer(state = { isInEditMode: false }, action) {
    switch (action.type) {
        case ADD_POST :
            return {
                ...state,
                isInEditMode: false,
                editedTitle: null,
                editedBody: null
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
        case SAVE_POST :
            return {
                ...state,
                editedTitle: action.data.title,
                editedBody: action.data.body,
            };
        case ADD_COMMENT :
            return {
                ...state,
                newComment: {
                    id: action.comment.id,
                    timestamp: action.comment.timestamp,
                    body: action.comment.body,
                    author: action.comment.author,
                    parentId: action.comment.parentId
                }
            };
        case EDIT_COMMENT :
            return {
                ...state,
                editedBody: action.data.body
            };
        default :
            return state
    }
}

export {postReducer}