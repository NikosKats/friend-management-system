// actions/myFriendsActions.ts
export const FETCH_FRIEND_REQUESTS_SENT_REQUEST = "FETCH_FRIEND_REQUESTS_SENT_REQUEST";
export const FETCH_FRIEND_REQUESTS_SENT_SUCCESS = "FETCH_FRIEND_REQUESTS_SENT_SUCCESS";
export const FETCH_FRIEND_REQUESTS_SENT_FAILURE = "FETCH_FRIEND_REQUESTS_SENT_FAILURE";

export const fetchFriendRequestsSentRequest = () => {
  console.log("🔥 [ACTION] Dispatching FETCH_FRIEND_REQUESTS_SENT_REQUEST");
  return { type: FETCH_FRIEND_REQUESTS_SENT_REQUEST };
};

export const fetchFriendRequestsSentSuccess = (users: any) => {
  console.log("✅ [ACTION] Dispatching FETCH_FRIEND_REQUESTS_SENT_SUCCESS with users:", users);
  return { type: FETCH_FRIEND_REQUESTS_SENT_SUCCESS, payload: users };
};

export const fetchFriendRequestsSentFailure = (error: string) => {
  console.error("❌ [ACTION] Dispatching FETCH_FRIEND_REQUESTS_SENT_FAILURE with error:", error);
  return { type: FETCH_FRIEND_REQUESTS_SENT_FAILURE, payload: error };
};