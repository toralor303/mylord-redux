import { combineReducers } from 'redux';
import players from './playerReducer';
import rule from './ruleReducer';

const rootReducer = combineReducers({
  players
});

export default rootReducer;
