import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserApi } from '../api/userApi';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '../actions/userActions';  // Ensure correct path

// Worker Saga: Fetch User Data
function* fetchUserSaga(action: any) {
  try {
    console.log("📬 [SAGA] Fetching user data...");
    const userId = action.payload;  // Get userId from action payload
    console.log("🚀 ~ function*fetchUserSaga ~ userId:", userId);

    // Call API to fetch user data
    const user = yield call(fetchUserApi, userId);
    console.log("🚀 ~ function*fetchUserSaga ~ user:", user);

    // Check if user data is successfully fetched
    if (user) {
      console.log("✅ [SAGA] User data fetched successfully:", user);
      yield put({ type: FETCH_USER_SUCCESS, payload: user });
    } else {
      console.error("❌ [SAGA] Failed to fetch user data.");
      yield put({ type: FETCH_USER_FAILURE, payload: "Failed to fetch user data" });
    }
  } catch (error) {
    console.error("❌ [SAGA] Error while fetching user data:", error);
    yield put({ type: FETCH_USER_FAILURE, payload: error.message });
  }
}

// Watcher Saga: Watches for the fetch user action
export function* watchUserSaga() {
  console.log("👀 [SAGA] Watching for user fetch actions...");
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
}
