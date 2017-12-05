import {
    FETCH_POST,
    VOTE_POST,
    VOTE_COMMENT,
    DELETE_COMMENT,
    ADD_COMMENTS,
    EDITING_POST,
    EDITING_COMMENT,
    SAVE_COMMENT,
    IS_ON_DETAIL_PAGE
} from "./action-types";

function postReducer(state = {
        postData: {postTitle: ''},
        commentData:{commentBody: ''},
        comments: [],
        isPostDetailPage: false
    }, action) {
    switch (action.type) {
        case FETCH_POST :
            return {
                ...state,
                post: action.post
            };
        case VOTE_POST :
            return {
                ...state,
                post: action.post
            };
        case VOTE_COMMENT :
            const index_ = returnListIndex(state.comments,action.comment);
            const comments_ = state.comments.map((comment,i) =>
                i === index_ ? action.comment : comment
            );
            return {
                ...state,
                comments:   (index_ > -1) ? comments_ : state.comments.concat(action.comment)
            };
        case DELETE_COMMENT :
            return {
                ...state,
                comments:   state.comments.filter(comment => {
                    return comment.id !== action.comment.id
                })
            };
        case ADD_COMMENTS :
            return {
                ...state,
                comments:   action.comments
            };
        case EDITING_POST :
            return {
                ...state,
                postData:   action.post
            };
        case EDITING_COMMENT :
            return {
                ...state,
                commentData:    action.commentData
            };
        case SAVE_COMMENT :
            const index = returnListIndex(state.comments,action.comment);
            const comments = state.comments.map((comment,i) =>
                i === index ? action.comment : comment
            );
            return {
                ...state,
                comments:   (index > -1) ? comments : state.comments.concat(action.comment)
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

function returnListIndex(elements,element) {
    return elements.findIndex(el => el.id === element.id)
}

export {postReducer}