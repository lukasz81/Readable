import {
    OPEN_MODAL,
    CLOSE_MODAL,
    TOGGLE_SORT
} from "./actions";

let sortTypeIsscore = true;

function modalReducer(state = {modalOpen: false}, action) {
    switch (action.type) {
        case OPEN_MODAL :
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
            sortTypeIsscore = !sortTypeIsscore;
            const type = sortTypeIsscore ? 'score' : 'time';
            return {
                ...state,
                sortBy: type
            };
        default :
            return state
    }
}

export { modalReducer, toggleSortReducer}