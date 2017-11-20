export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';
export const TOGGLE_SORT = 'TOGGLE_SORT';

export function openModal (value) {
    return {
        type: 'OPEN_MODAL',
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
