import {STORE_POSTS} from "./action-types";
import {ADD_TO_POSTS} from "./action-types";
import {REMOVE_FROM_POSTS} from "./action-types";
import {TOGGLE_SORT} from "./action-types";

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