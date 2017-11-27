import {CLOSE_MODAL} from "./action-types";
import {OPEN_MODAL} from "./action-types"

export function openModal (value) {
    return {
        type: OPEN_MODAL,
        value
    };
}

export function closeModal (value) {
    return {
        type: CLOSE_MODAL,
        value
    };
}