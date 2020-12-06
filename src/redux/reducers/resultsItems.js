import { UPDATE_RESULT_ITEMS } from '../actionTypes';

const initialState = {
  resultItems: [],
  query: ''
}

/**
 * @method
 * @description Mets à jour les résultats dans le store
 * @param {*} state 
 * @param {*} action 
 */
const resultItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RESULT_ITEMS:
      const { query, results } = action.payload.resultItems;

      return {
        query: query,
        resultItems: [
          ...results,
        ],
      }
    default:
      return state;
  }
}
export default resultItemsReducers;