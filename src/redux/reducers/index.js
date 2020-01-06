import { combineReducers } from 'redux';
import players from './playerReducer';

export default function rootReducer() {
  combineReducers({
    players
  });
}
