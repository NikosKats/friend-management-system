import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  fetchMyFriendsSuccess, 
  fetchMyFriendsFailure, 
  FETCH_MY_FRIENDS_REQUEST 
} from '../actions/myFriendsActions';
import { myFriendsApi } from '../api/myFriendsApi';   

// Worker saga to handle fetching friends
function* handleFetchMyFriends() {
  try {
    console.log("⚙️ [SAGA] Running handleFetchMyFriends saga...");
 
    const friends = yield call(myFriendsApi); // Call the API function
    console.log("✅ [SAGA] Friends fetched successfully:", friends);

    yield put(fetchMyFriendsSuccess(friends)); // Dispatch success with fetched friends
  } catch (error: any) {

    console.error("❌ [SAGA] Error fetching friends:", error.message);
    yield put(fetchMyFriendsFailure(error.message || 'Something went wrong')); // Dispatch failure with error message
  }
}

// Watcher saga to listen for FETCH_MY_FRIENDS_REQUEST action
function* watchMyFriendsSaga() {
  console.log("👀 [SAGA] Watching for FETCH_MY_FRIENDS_REQUEST...");
  yield takeEvery(FETCH_MY_FRIENDS_REQUEST, handleFetchMyFriends);
}

export { watchMyFriendsSaga };
