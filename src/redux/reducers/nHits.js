import { UPDATE_NHITS } from '../actionTypes';

const initialState = {
  nHits: 0,
}
/**
 * @method
 * @description Mets à jour le nombre de résultats de recherche total disponible avec l'api
 * @param {*} state 
 * @param {*} action 
 */
const nHitsReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NHITS:
      const { nHits } = action.payload;
      return {
        ...state,
        nHits,
      }
    default:
      return state;
  }
}
export default nHitsReducers;
