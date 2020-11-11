
export const getResultItemsState = store => store.resultItems;

export const getResultItemsList = store => getResultItemsState(store) ? getResultItemsState(store) : [];
