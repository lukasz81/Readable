import { combineReducers } from 'redux';
import { modalReducer } from './app/shared-modal-content/reducer.js';
import { postsReducer } from './app/posts/reducer.js';
import { postReducer } from './app/posts/post/reducer.js';


export const rootReducer = combineReducers({
    modalReducer,
    postsReducer,
    postReducer
});