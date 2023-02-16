import { combineReducers } from 'redux';
import auditListReducer from './auditReducer';
import authReducer from './authReducer';
import inventaryReducer from './inventaryReducer';
import outputReducer from './outputReducer';
export default combineReducers({
  authReducer,
  inventaryReducer,
  outputReducer,
  auditListReducer
});
