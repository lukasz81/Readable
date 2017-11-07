import {
    STORE_POSTS,
} from "./actions";

function postsReducer(state = [], action) {
    switch (action.type) {
        case STORE_POSTS :
            console.log('STORE_POSTS: =>',action);
            return {
                ...state,
                posts: action.posts
            };
        default :
            return state
    }
}

export { postsReducer }