import { UPDATE_RESULT_ITEMS, UPDATE_NHITS } from './actionTypes';

export const updateResultItems = resultItems => ({
  type: UPDATE_RESULT_ITEMS,
  payload: {
    resultItems
  }
});

export const updateNHits = nHits => ({
  type: UPDATE_NHITS,
  payload: { nHits },
});