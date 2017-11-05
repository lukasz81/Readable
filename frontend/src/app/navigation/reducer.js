import {
    SHOW_MODAL,
    CLOSE_MODAL
} from "./actions";

function navigation_reducer(state = {modalOpen: false}, action) {
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

export { navigation_reducer }