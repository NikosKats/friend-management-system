import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  fetchMyFriendsSuccess, 
  fetchMyFriendsFailure, 
  REMOVE_MY_FRIENDS_REQUEST, 
  REMOVE_MY_FRIENDS_SUCCESS, 
  REMOVE_MY_FRIENDS_FAILURE 
} from '../actions/myFriendsActions';
import { myFriendsApi, removeFriendApi } from '../api/myFriendsApi';   // Assuming removeFriendApi exists

// Worker saga to handle fetching friends
function* handleFetchMyFriends() {
  try {
    console.log("⚙️ [SAGA] Running handleFetchMyFriends saga...");
 
    const friends = yield call(myFriendsApi); // Call the API function to fetch friends
    console.log("✅ [SAGA] Friends fetched successfully:", friends);

    yield put(fetchMyFriendsSuccess(friends)); // Dispatch success with fetched friends
  } catch (error: any) {
    console.error("❌ [SAGA] Error fetching friends:", error.message);
    yield put(fetchMyFriendsFailure(error.message || 'Something went wrong')); // Dispatch failure with error message
  }
}

// Worker saga to handle removing a friend
function* handleRemoveMyFriend(action: any) {
  try {
    console.log("⚙️ [SAGA] Running handleRemoveMyFriend saga...");

    // Call the API to remove the friend
    const { userId, friendId } = action.payload;
    yield call(removeFriendApi, userId, friendId); // Assuming removeFriendApi takes userId and friendId

    console.log(`✅ [SAGA] Friend with ID ${friendId} removed successfully`);

    // Dispatch success action to remove friend from the state
    yield put({ type: REMOVE_MY_FRIENDS_SUCCESS, payload: friendId });

    // Optionally, refetch the friends list after successful removal
    yield put({ type: FETCH_MY_FRIENDS_REQUEST });

  } catch (error: any) {
    console.error("❌ [SAGA] Error removing friend:", error.message);
    yield put({ type: REMOVE_MY_FRIENDS_FAILURE, payload: error.message || 'Error removing friend' });
  }
}

// Watcher saga to listen for REMOVE_MY_FRIENDS_REQUEST action
function* watchMyFriendsSaga() {
  console.log("👀 [SAGA] Watching for actions...");
  yield takeEvery('FETCH_MY_FRIENDS_REQUEST', handleFetchMyFriends);  // Watching for fetching friends
  yield takeEvery(REMOVE_MY_FRIENDS_REQUEST, handleRemoveMyFriend);  // Watching for remove friend request
}

export { watchMyFriendsSaga };
