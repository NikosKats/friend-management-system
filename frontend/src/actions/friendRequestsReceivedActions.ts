// actions/myFriendsActions.ts
export const FETCH_FRIEND_REQUESTS_RECEIVED_REQUEST = "FETCH_FRIEND_REQUESTS_RECEIVED_REQUEST";
export const FETCH_FRIEND_REQUESTS_RECEIVED_SUCCESS = "FETCH_FRIEND_REQUESTS_RECEIVED_SUCCESS";
export const FETCH_FRIEND_REQUESTS_RECEIVED_FAILURE = "FETCH_FRIEND_REQUESTS_RECEIVED_FAILURE";

export const fetchFriendRequestsReceivedRequest = () => {
  console.log("🔥 [ACTION] Dispatching FETCH_FRIEND_REQUESTS_RECEIVED_REQUEST");
  return { type: FETCH_FRIEND_REQUESTS_RECEIVED_REQUEST };
};

export const fetchFriendRequestsReceivedSuccess = (users: any) => {
  console.log("✅ [ACTION] Dispatching FETCH_FRIEND_REQUESTS_RECEIVED_SUCCESS with users:", users);
  return { type: FETCH_FRIEND_REQUESTS_RECEIVED_SUCCESS, payload: users };
};

export const fetchFriendRequestsReceivedFailure = (error: string) => {
  console.error("❌ [ACTION] Dispatching FETCH_FRIEND_REQUESTS_RECEIVED_FAILURE with error:", error);
  return { type: FETCH_FRIEND_REQUESTS_RECEIVED_FAILURE, payload: error };
};