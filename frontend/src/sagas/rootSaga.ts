import { all } from 'redux-saga/effects';
import watchAuthSaga from './authSaga';
import { watchUserSaga } from './userSaga';

import { watchUsersSaga } from './usersSaga';
import { watchFriendRequests } from './friendSaga';   

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),   
    watchUsersSaga(),  
    watchUserSaga(),   
    watchFriendRequests(),   
  ]);
}
