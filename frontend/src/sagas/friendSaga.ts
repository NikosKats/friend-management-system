import { call, put, takeLatest } from 'redux-saga/effects';
import { sendFriendRequestApi, respondToFriendRequestApi } from '../api/friendApi';
import {
  SEND_FRIEND_REQUEST_REQUEST,
  SEND_FRIEND_REQUEST_SUCCESS,
  SEND_FRIEND_REQUEST_FAILURE,
  RESPOND_FRIEND_REQUEST_REQUEST,
  RESPOND_FRIEND_REQUEST_SUCCESS,
  RESPOND_FRIEND_REQUEST_FAILURE,
} from '../actions/friendActions';  // Ensure correct path

// Worker Saga: Send Friend Request
function* sendFriendRequestSaga(action: any) {
  try {
    console.log("📬 [SAGA] Sending friend request...");
    const { senderId, receiverId } = action.payload;
    console.log("🚀 ~ function*sendFriendRequestSaga ~ senderId, receiverId:", senderId, receiverId);

    // Call API to send friend request
    const response = yield call(sendFriendRequestApi, senderId, receiverId);
    console.log("🚀 ~ function*sendFriendRequestSaga ~ response:", response);

    // Check for success
    if (response && response.message === 'Friend request sent successfully') {
      console.log("✅ [SAGA] Friend request sent successfully:", response.message);
      yield put({ type: SEND_FRIEND_REQUEST_SUCCESS, payload: response.message });
    } else if (response && response.error === 'Friend request already sent') {
      // Handle case where the friend request has already been sent
      console.error("⚠️ [SAGA] Friend request already sent:", response.error);
      yield put({ type: SEND_FRIEND_REQUEST_FAILURE, payload: response.error });
    } else {
      // Handle any other failure response
      console.error("❌ [SAGA] Friend request failed:", response.message);
      yield put({ type: SEND_FRIEND_REQUEST_FAILURE, payload: response.message });
    }
  } catch (error) {
    console.error("❌ [SAGA] Error while sending friend request:", error);
    yield put({ type: SEND_FRIEND_REQUEST_FAILURE, payload: error.message });
  }
}



// Worker Saga: Respond to Friend Request
function* respondToFriendRequestSaga(action: any) {
  try {
    console.log("📬 [SAGA] Responding to friend request...");
    const { requestId, status } = action.payload;

    // Call API to respond to friend request
    const response = yield call(respondToFriendRequestApi, requestId, status);

    if (response.success) {
      console.log("✅ [SAGA] Responded to friend request successfully:", response.message);
      yield put({ type: RESPOND_FRIEND_REQUEST_SUCCESS, payload: response.message });
    } else {
      console.error("❌ [SAGA] Failed to respond to friend request:", response.message);
      yield put({ type: RESPOND_FRIEND_REQUEST_FAILURE, payload: response.message });
    }
  } catch (error) {
    console.error("❌ [SAGA] Error while responding to friend request:", error);
    yield put({ type: RESPOND_FRIEND_REQUEST_FAILURE, payload: error.message });
  }
}

// Watcher Saga: Watches for the friend request actions
export function* watchFriendRequests() {
  console.log("👀 [SAGA] Watching for friend request actions...");
  yield takeLatest(SEND_FRIEND_REQUEST_REQUEST, sendFriendRequestSaga);
  yield takeLatest(RESPOND_FRIEND_REQUEST_REQUEST, respondToFriendRequestSaga);
}
