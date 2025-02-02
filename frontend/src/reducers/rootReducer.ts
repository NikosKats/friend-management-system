import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import friendReducer from './friendReducer';  
import myFriendsReducer from './myFriendsReducer';  

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  users: usersReducer,
  friend: friendReducer,   
  myFriend: myFriendsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
