import {
    OPEN_MODAL,
    CLOSE_MODAL
} from "./action-types";

function modalReducer(state = {
        modalOpen: false,
        actionType: 'add-post'
    }, action) {
    switch (action.type) {
        case OPEN_MODAL :
            return {
                ...state,
                modalOpen: true,
                actionType: action.value.type
            };
        case CLOSE_MODAL :
            return {
                ...state,
                modalOpen: false,
                actionType: ''
            };
        default :
            return state
    }
}

export {modalReducer}