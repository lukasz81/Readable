export const STORE_POSTS = 'STORE_POSTS';
export const ADD_TO_POSTS = 'ADD_TO_POSTS';
export const REMOVE_FROM_POSTS = 'REMOVE_FROM_POSTS';
export const TOGGLE_SORT = 'TOGGLE_SORT';
let sortTypeIsScore = true;

export function storePosts (posts,sortBy) {
    return {
        type: STORE_POSTS,
        posts: posts,
        sortBy
    };
}

export function addToPosts (post) {
    return {
        type: ADD_TO_POSTS,
        post: post
    };
}

export function removeFromPosts (post) {
    return {
        type: REMOVE_FROM_POSTS,
        post: post
    };
}

export function toggleSort () {
    return {
        type: TOGGLE_SORT,
        isScore: sortTypeIsScore = !sortTypeIsScore
    };
}