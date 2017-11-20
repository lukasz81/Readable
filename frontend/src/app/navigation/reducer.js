import {
    TOGGLE_SORT
} from "./actions";

let sortTypeIsscore = true;

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

export {toggleSortReducer}