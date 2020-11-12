import { UPDATE_RESULT_ITEMS } from '../actionTypes';

const initialState = {
  resultItems: []
}

const resultItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RESULT_ITEMS:
      const { resultItems } = action.payload;
      return {
        // ...state,
        resultItems: [
          ...resultItems
        ]
      }
    default:
      return state;
  }
}

export default resultItemsReducers;