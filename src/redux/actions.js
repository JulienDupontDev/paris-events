import { UPDATE_RESULT_ITEMS, UPDATE_NHITS, UPDATE_LOADING } from './actionTypes';

/**
 * @method
 * @description Permet de mettre à jour les résultats de recherche
 * @param {Object[]} resultItems 
 */
export const updateResultItems = resultItems => ({
  type: UPDATE_RESULT_ITEMS,
  payload: {
    resultItems,
  }
});

/**
 * @method
 * @description Permet de mettre à jour le nombre de résultats totaux disponibles renvoyés par l'api
 * @param {int} nHits 
 */
export const updateNHits = nHits => ({
  type: UPDATE_NHITS,
  payload: { nHits },
});

/**
 * @method
 * @description Permet de mettre à jour l'état du chargement des resultats
 * @param {boolean} loading true = chargement en cours
 */
export const updateLoading = loading => ({
  type: UPDATE_LOADING,
  payload: {
    loading,
  }
})