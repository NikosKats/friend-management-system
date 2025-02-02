import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  fetchFriendRequestsReceivedSuccess, 
  fetchFriendRequestsReceivedFailure, 
  FETCH_FRIEND_REQUESTS_RECEIVED_REQUEST 
} from '../actions/friendRequestsReceivedActions';
import { friendRequestsReceivedApi } from '../api/friendRequestsReceivedApi';

// Worker saga to handle fetching received friend requests
function* handleFetchFriendRequestsReceived() {
  try {
    console.log("⚙️ [SAGA] Running handleFetchFriendRequestsReceived saga...");
 
    const friendRequests = yield call(friendRequestsReceivedApi); // Call the API function
    console.log("✅ [SAGA] Received friend requests fetched successfully:", friendRequests);

    yield put(fetchFriendRequestsReceivedSuccess(friendRequests)); // Dispatch success with fetched requests
  } catch (error: any) {

    console.error("❌ [SAGA] Error fetching received friend requests:", error.message);
    yield put(fetchFriendRequestsReceivedFailure(error.message || 'Something went wrong')); // Dispatch failure with error message
  }
}

// Watcher saga to listen for FETCH_FRIEND_REQUESTS_RECEIVED_REQUEST action
function* watchFriendRequestsReceivedSaga() {
  console.log("👀 [SAGA] Watching for FETCH_FRIEND_REQUESTS_RECEIVED_REQUEST...");
  yield takeEvery(FETCH_FRIEND_REQUESTS_RECEIVED_REQUEST, handleFetchFriendRequestsReceived);
}

export { watchFriendRequestsReceivedSaga };
