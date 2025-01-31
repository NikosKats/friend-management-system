import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import friendReducer from './friendReducer';   

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  friend: friendReducer,   
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
