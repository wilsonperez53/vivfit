
import { combineReducers } from 'redux';
import home from './home';
import settings from './settings';
import library from './library';

const rootReducer = combineReducers({
  home,
  settings,
  library
});

export default rootReducer;

export { default as currentUser } from './reducerUser'