import { combineReducers } from 'redux';

import resultItems from './resultsItems';
import nHits from './nHits';
import loading from './loading';

export default combineReducers({ resultItems, nHits, loading });
