export const STORE_POSTS = 'STORE_POSTS';

export function storePosts (posts) {
    return {
        type: 'STORE_POSTS',
        posts: posts
    };
}