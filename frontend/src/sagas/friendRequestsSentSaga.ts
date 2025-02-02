 
import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  fetchFriendRequestsSentSuccess, 
  fetchFriendRequestsSentFailure, 
  FETCH_FRIEND_REQUESTS_SENT_REQUEST 
} from '../actions/friendRequestsSentActions';
import { friendRequestsSentApi } from '../api/friendRequestsSentApi';

function* handleSendFriendRequest(action: any) {
  try {
    console.log("⚙️ [SAGA] Running handleSendFriendRequest saga...");

    const response = yield call(friendRequestsSentApi, action.payload); // Call the API function with userId from action.payload
    console.log("✅ [SAGA] Friend request sent successfully:", response);

    yield put(fetchFriendRequestsSentSuccess(response)); // Dispatch success with response
  } catch (error: any) {
    console.error("❌ [SAGA] Error sending friend request:", error.message);
    yield put(fetchFriendRequestsSentFailure(error.message || 'Something went wrong')); // Dispatch failure with error message
  }
}

export default handleSendFriendRequest;
 

function* watchFriendRequestsSentSaga() {
  console.log("👀 [SAGA] Watching for FRIEND_REQUEST_SENT_REQUEST...");
  yield takeEvery(FETCH_FRIEND_REQUESTS_SENT_REQUEST, handleSendFriendRequest); // Watch for the send request action
}

export { watchFriendRequestsSentSaga };
