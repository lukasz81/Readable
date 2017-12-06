import {
    STORE_POSTS,
    ADD_TO_POSTS,
    SAVE_EDITED_POST,
    REMOVE_POST,
    TOGGLE_SORT,
    VOTE_POSTS
} from "./action-types";

function postsReducer(state = {
        sortBy:'score',
        posts:[],
    }, action) {
    switch (action.type) {
        case STORE_POSTS :
            return {
                ...state,
                posts:  compare(action.posts,state.sortBy)
            };
        case ADD_TO_POSTS :
            return {
                ...state,
                post:   action.post,
                posts:  compare(state.posts.filter(post => {
                            return post.id !== action.post.id
                        }).concat(action.post),state.sortBy)
            };
        case SAVE_EDITED_POST :
            return {
                ...state,
                post: action.post,
                posts:  compare(state.posts.filter(post => {
                            return post.id !== action.post.id
                        }).concat(action.post),state.sortBy)
            };
        case REMOVE_POST :
            return {
                ...state,
                posts:  state.posts.filter(post => {
                            return post.id !== action.post.id
                        })
            };
        case TOGGLE_SORT :
            const sort = action.isScore ? 'score' : 'time';
            return {
                ...state,
                sortBy: sort,
                posts:  compare(state.posts,sort)
            };
        case VOTE_POSTS :
            return {
                ...state,
                posts:  compare(state.posts.filter(post => {
                            return post.id !== action.post.id
                        }).concat(action.post),state.sortBy)
            };
        default :
            return state
    }
}

function compare(elements,sort) {
    return elements.sort((a,b) => {
        return sort === 'score' ? b.voteScore - a.voteScore : b.timestamp - a.timestamp
    })
}

export { postsReducer }