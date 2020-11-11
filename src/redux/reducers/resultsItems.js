import { UPDATE_RESULT_ITEMS } from '../actionTypes';

const initialState = {
  resultItems: []
}

const resultItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RESULT_ITEMS:
      const { content } = action.payload;
      return {
        ...state,
        resultItems: [...content]
      }
    default:
      return state;
  }
}

export default resultItemsReducers;