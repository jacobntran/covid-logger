import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import eventReducer from './eventReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  event: eventReducer,
});
