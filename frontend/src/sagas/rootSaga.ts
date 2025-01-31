import { all } from 'redux-saga/effects';
import watchAuthSaga from './authSaga';
import { watchUserSaga } from './userSaga';  // Import watchUserSaga

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),  // Keeps watching for LOGIN_REQUEST actions
    watchUserSaga(),      // Add this to watch for FETCH_USERS_REQUEST
  ]);
}
