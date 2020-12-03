/**
 * @method
 * @description Permet de récupérer le state actuel des résultats de recherche
 * @param {*} store 
 */
export const getResultItemsState = store => store.resultItems;
/**
 * @method
 * @description Permet de renvoyer les résultats de recherche contenus dans le store
 * @param {*} store 
 */
export const getResultItemsList = store => getResultItemsState(store) ? getResultItemsState(store) : [];
/**
 * @method
 * @description Permet de récupérer l'état du  nombre de résultats totaux disponibles
 * @param {*} store 
 */
export const getNhitsState = store => store.nHits;
/**
 * @method
 * @description Permet de récupérer le nombre de résultats totaux disponibles avec l'api 
 * @param {*} store 
 */
export const getNhits = store => getNhitsState(store) ? getNhitsState(store) : Number;

/**
 * @method
 * @description Permet de récupérer l'état de la variable d'état du chargement des résultats
 * @param {*} store 
 */
export const getLoadingState = store => store.loading;

/**
 * @method
 * @description Permet de connaître l'état du chargement des résultats
 * @param {*} store 
 */
export const getLoading = store => getLoadingState(store) ? getLoadingState(store) : Number;