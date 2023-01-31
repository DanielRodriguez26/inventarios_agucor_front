import { combineReducers } from 'redux';
import authReducer from './authReducer';
import inventaryReducer from './inventaryReducer';

// import User from './userReducer';
// import Login from './loginReducer';

export default combineReducers({
  authReducer,
  inventaryReducer

  // Login
});
