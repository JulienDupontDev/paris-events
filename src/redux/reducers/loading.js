import { UPDATE_LOADING } from '../actionTypes';

const initialState = {
  loading: true,
}
/**
 * @method
 * @description Mets à jour l'état de chargement des résultats
 * @param {*} state 
 * @param {*} action 
 */
const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOADING:
      const { loading } = action.payload;
      return { ...state, loading };
    default:
      return state;
  }
}
export default loadingReducer;