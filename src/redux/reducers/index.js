import { combineReducers } from 'redux';

import resultItems from './resultsItems';
import nHits from './NHits';

export default combineReducers({ resultItems, nHits });
