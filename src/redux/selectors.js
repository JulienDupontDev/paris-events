
export const getResultItemsState = store => store.resultItems;

export const getResultItemsList = store => getResultItemsState(store) ? getResultItemsState(store) : [];

export const getNhitsState = store => store.nHits;

export const getNhits = store => getNhitsState(store) ? getNhitsState(store) : Number;
