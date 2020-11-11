import { UPDATE_RESULT_ITEMS } from './actionTypes';

export const updateResultItems = content => ({
  type: UPDATE_RESULT_ITEMS,
  payload: {
    content: content
  }
});