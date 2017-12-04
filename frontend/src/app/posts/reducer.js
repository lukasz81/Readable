import {
    STORE_POSTS,
    ADD_TO_POSTS,
    REMOVE_FROM_POSTS,
    TOGGLE_SORT
} from "./action-types";

function postsReducer(state = {sortBy:'score',posts:[]}, action) {
    switch (action.type) {
        case STORE_POSTS :
            return {
                ...state,
                posts:  Object.assign([],state,compare(action.posts,state.sortBy))
            };
        case ADD_TO_POSTS :
            return {
                ...state,
                post:   Object.assign({},state,action.post),
                posts:  Object.assign([],state,compare(state.posts.filter(post => {
                            return post.id !== action.post.id
                        }).concat(action.post),state.sortBy))
            };
        case REMOVE_FROM_POSTS :
            return {
                ...state,
                posts:  Object.assign([],state,compare(state.posts.filter(post => {
                            return post.id !== action.post.id
                        }),state.sortBy))
            };
        case TOGGLE_SORT :
            return {
                ...state,
                sortBy: Object.assign({},state,action.isScore ? 'score' : 'time'),
                posts:  Object.assign([],state,compare(state.posts,action.isScore ? 'score' : 'time'))
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