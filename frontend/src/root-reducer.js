import { combineReducers } from 'redux';
import { modalReducer, toggleSortReducer } from './app/navigation/reducer.js';
import { postsReducer } from './app/posts/reducer.js'

export const rootReducer = combineReducers({
    modalReducer,
    postsReducer,
    toggleSortReducer
});