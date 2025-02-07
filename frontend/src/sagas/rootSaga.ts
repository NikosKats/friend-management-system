import { all } from 'redux-saga/effects';
import watchAuthSaga from './authSaga';
import { watchUserSaga } from './userSaga';
import { watchUsersSaga } from './usersSaga';
import { watchFriendRequests } from './friendSaga';   
import {watchMyFriendsSaga} from './myFriendsSaga';
import {watchFriendRequestsReceivedSaga} from './friendRequestsReceivedSaga';
import {watchFriendRequestsSentSaga} from './friendRequestsSentSaga';

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),   
    watchUsersSaga(),  
    watchUserSaga(),   
    watchFriendRequests(),  
    watchMyFriendsSaga(),
    watchFriendRequestsReceivedSaga(),
    watchFriendRequestsSentSaga()
  ]);
}
