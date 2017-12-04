import {
    STORE_POSTS,
    ADD_TO_POSTS,
    REMOVE_FROM_POSTS,
    TOGGLE_SORT
} from "./action-types";
import * as API from "../api";

let sortTypeIsScore = true;

export function storePosts (sortBy) {
    return (dispatch) => {
        API.fetchElements('/posts')
            .then(posts => dispatch({
                type: STORE_POSTS,
                posts: posts,
                sortBy
            }));
    }
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