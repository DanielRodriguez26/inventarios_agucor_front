import { combineReducers } from 'redux';
import authReducer from './authReducer';
import inventaryReducer from './inventaryReducer';
import outputReducer from './outputReducer';

export default combineReducers({
  authReducer,
  inventaryReducer,
  outputReducer
});
