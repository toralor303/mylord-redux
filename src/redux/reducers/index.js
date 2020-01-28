import { combineReducers } from 'redux';
import players from './playerReducer';
import rule from './ruleReducer';

const rootReducer = combineReducers({
  players,
  rule
});

export default rootReducer;
