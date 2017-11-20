export const TOGGLE_SORT = 'TOGGLE_SORT';

export function toggleSort (sortBy) {
    return {
        type: TOGGLE_SORT,
        sortType: sortBy
    };
}
