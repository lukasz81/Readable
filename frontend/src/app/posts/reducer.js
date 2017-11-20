import {
    STORE_POSTS
} from "./actions";

function postsReducer(state = [], action) {
    switch (action.type) {
        case STORE_POSTS :
            return {
                ...state,
                posts: action.posts
            };
        default :
            return state
    }
}

export { postsReducer }