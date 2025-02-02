import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import friendReducer from './friendReducer';  
import myFriendsReducer from './myFriendsReducer';  
import friendRequestsReceivedReducer from './friendRequestsReceivedReducer';
import friendRequestsSentReducer from './friendRequestsSentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  users: usersReducer,
  friend: friendReducer,   
  myFriend: myFriendsReducer,
  friendRequestsReceived: friendRequestsReceivedReducer,
  friendRequestsSent: friendRequestsSentReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
