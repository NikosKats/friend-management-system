import { all } from 'redux-saga/effects';
import watchAuthSaga from './authSaga';
import { watchUserSaga } from './userSaga';
import { watchFriendRequests } from './friendSaga';   

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),   
    watchUserSaga(),   
    watchFriendRequests(),   
  ]);
}
