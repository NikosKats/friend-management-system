import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchUsersSuccess, fetchUsersFailure, FETCH_USERS_REQUEST } from '../actions/usersActions';
import { fetchUsersApi } from '../api/usersApi';   

// Worker saga to handle fetching users
function* handleFetchUsers() {
  try {
    console.log("⚙️ [SAGA] Running handleFetchUsers saga...");
    const users = yield call(fetchUsersApi); // Call the API function
    console.log("✅ [SAGA] Users fetched successfully:", users);
    yield put(fetchUsersSuccess(users)); // Dispatch success with fetched users
  } catch (error: any) {
    console.error("❌ [SAGA] Error fetching users:", error.message);
    yield put(fetchUsersFailure(error.message || 'Something went wrong')); // Dispatch failure with error message
  }
}

// Watcher saga to listen for FETCH_USERS_REQUEST action
function* watchUsersSaga() {
  console.log("👀 [SAGA] Watching for FETCH_USERS_REQUEST...");
  yield takeEvery(FETCH_USERS_REQUEST, handleFetchUsers);
}

export { watchUsersSaga };
