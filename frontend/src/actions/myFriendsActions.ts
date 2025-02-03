export const FETCH_MY_FRIENDS_REQUEST = "FETCH_MY_FRIENDS_REQUEST";
export const FETCH_MY_FRIENDS_SUCCESS = "FETCH_MY_FRIENDS_SUCCESS";
export const FETCH_MY_FRIENDS_FAILURE = "FETCH_MY_FRIENDS_FAILURE";

export const REMOVE_MY_FRIENDS_REQUEST = "REMOVE_MY_FRIENDS_REQUEST";
export const REMOVE_MY_FRIENDS_SUCCESS = "REMOVE_MY_FRIENDS_SUCCESS";
export const REMOVE_MY_FRIENDS_FAILURE = "REMOVE_MY_FRIENDS_FAILURE";

// Action to initiate the fetch request for friends
export const fetchMyFriendsRequest = () => {
  console.log("🔥 [ACTION] Dispatching FETCH_USERS_REQUEST");
  return { type: FETCH_MY_FRIENDS_REQUEST };
};

// Action for successful fetch of friends
export const fetchMyFriendsSuccess = (users: any) => {
  console.log("✅ [ACTION] Dispatching FETCH_MY_FRIENDS_SUCCESS with users:", users);
  return { type: FETCH_MY_FRIENDS_SUCCESS, payload: users };
};

// Action for failed fetch of friends
export const fetchMyFriendsFailure = (error: string) => {
  console.error("❌ [ACTION] Dispatching FETCH_MY_FRIENDS_FAILURE with error:", error);
  return { type: FETCH_MY_FRIENDS_FAILURE, payload: error };
};

// Action to initiate the remove friend request
export const removeMyFriendRequest = (userId: string, friendId: string) => {
  console.log(`🔥 [ACTION] Dispatching REMOVE_MY_FRIENDS_REQUEST for user ${userId} to remove friend ${friendId}`);
  return { type: REMOVE_MY_FRIENDS_REQUEST, payload: { userId, friendId } };
};

// Action for successful removal of a friend
export const removeMyFriendSuccess = (friendId: string) => {
  console.log(`✅ [ACTION] Dispatching REMOVE_MY_FRIENDS_SUCCESS for friendId ${friendId}`);
  return { type: REMOVE_MY_FRIENDS_SUCCESS, payload: friendId };
};

// Action for failed removal of a friend
export const removeMyFriendFailure = (error: string) => {
  console.error("❌ [ACTION] Dispatching REMOVE_MY_FRIENDS_FAILURE with error:", error);
  return { type: REMOVE_MY_FRIENDS_FAILURE, payload: error };
};
