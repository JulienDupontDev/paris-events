import { UPDATE_NHITS } from '../actionTypes';

const initialState = {
  nHits: 0
}

const nHitsReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NHITS:
      const { nHits } = action.payload;
      return {
        ...state,
        nHits
      }
    default:
      return state;
  }
}

export default nHitsReducers;