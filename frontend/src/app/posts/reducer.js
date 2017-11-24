import {
    STORE_POSTS,
    ADD_TO_POSTS,
    TOGGLE_SORT
} from "./actions";

let sortTypeIsScore = true;

function postsReducer(state = [], action) {
    console.log('action => ',action,state);
    switch (action.type) {
        case STORE_POSTS :
            return {
                ...state,
                posts: compare(action.posts,action.sortBy)
            };
        case ADD_TO_POSTS :
            return {
                ...state,
                posts: compare(state.posts.concat(action.post),action.sortBy)
            };
        case TOGGLE_SORT :
            sortTypeIsScore = !sortTypeIsScore;
            const sortBy = sortTypeIsScore ? 'score' : 'time';
            return {
                ...state,
                sortBy: sortBy,
                posts: compare(state.posts,sortBy)
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