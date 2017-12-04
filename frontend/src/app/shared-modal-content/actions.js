import {TOGGLE_MODAL} from "./action-types";

let isModalOpen = false;

export function toggleModal(value) {
    return {
        type: TOGGLE_MODAL,
        isModalOpen: isModalOpen = !isModalOpen,
        value
    };
}