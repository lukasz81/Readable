import {
    SAVE_POST,
    DELETE_COMMENT,
    ADD_COMMENTS,
    EDIT_POST,
    EDIT_COMMENT,
    SAVE_COMMENT,
    IS_ON_DETAIL_PAGE
} from "./action-types";

function postReducer(state = {
        postData:{postTitle: ''},
        commentData:{commentBody: ''},
        comments: [],
        isPostDetailPage: false
    }, action) {
    switch (action.type) {
        case SAVE_POST :
            return {
                ...state,
                post:   action.post
            };
        case DELETE_COMMENT :
            return {
                ...state,
                comments:   Object.assign([],state,state.comments.filter(comment => {
                                return comment.id !== action.comment.id
                            }))
            };
        case ADD_COMMENTS :
            return {
                ...state,
                comments: Object.assign([],state,action.comments)
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
            const index = state.comments.findIndex(comment => comment.id === action.comment.id);
            const comments = state.comments.map((comment,i) =>
                i === index ? action.comment : comment
            );
            return {
                ...state,
                comments: (index > -1) ? comments : state.comments.concat(action.comment)
            };
        case IS_ON_DETAIL_PAGE :
            return {
                ...state,
                isPostDetailPage: action.isPostDetailPage
            };
        default :
            return state
    }
}

export {postReducer}