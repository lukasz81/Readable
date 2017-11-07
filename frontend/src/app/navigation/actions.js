export const SHOW_MODAL = 'SHOW_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const TOGGLE_SORT = 'TOGGLE_SORT';

export function showModal (value) {
    return {
        type: 'SHOW_MODAL',
        value
    };
}

export function closeModal (value) {
    return {
        type: 'CLOSE_MODAL',
        value
    };
}

export function toggleSort (sortBy) {
    return {
        type: 'TOGGLE_SORT',
        sortType: sortBy
    };
}
