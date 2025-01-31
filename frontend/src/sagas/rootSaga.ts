import { all } from 'redux-saga/effects';
import watchLoginRequest from './authSaga';

export default function* rootSaga() {
  yield all([
    watchLoginRequest(),
  ]);
}
