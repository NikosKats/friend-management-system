import { call, put, takeEvery } from 'redux-saga/effects';
import { setUser } from '../reducers/userReducer';
import { FETCH_USER_REQUEST } from '../actions/userActions';

function* handleFetchUser(action: any) {
  try {
    const user = yield call(fetchUserApi, action.payload); // Replace `fetchUserApi` with your API call
    yield put(setUser(user)); // Dispatch set user data
  } catch (error) {
    // Handle user fetch failure
  }
}

function* watchUserSaga() {
  yield takeEvery(FETCH_USER_REQUEST, handleFetchUser);
}

export { watchUserSaga };
