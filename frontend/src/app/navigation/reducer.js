import {
    SHOW_MODAL,
    CLOSE_MODAL,
    TOGGLE_SORT
} from "./actions";

let score = true;

function modalReducer(state = {modalOpen: false}, action) {
    switch (action.type) {
        case SHOW_MODAL :
            return {
                ...state,
                modalOpen: true
            };
        case CLOSE_MODAL :
            return {
                ...state,
                modalOpen: false
            };
        default :
            return state
    }
}

function toggleSortReducer(state = {sortBy: 'score'}, action) {
    switch (action.type) {
        case TOGGLE_SORT :
            score = !score;
            const type = score ? 'score' : 'time';
            return {
                ...state,
                sortBy: type
            };
        default :
            return state
    }
}

export { modalReducer, toggleSortReducer }