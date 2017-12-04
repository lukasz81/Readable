import {
    TOGGLE_MODAL,
} from "./action-types";

function modalReducer(state = {
        modalOpen: false,
        actionType: 'add-post'
    }, action) {
    switch (action.type) {
        case TOGGLE_MODAL :
            return {
                ...state,
                modalOpen: action.isModalOpen,
                actionType: action.value.type
            };
        default :
            return state
    }
}

export {modalReducer}