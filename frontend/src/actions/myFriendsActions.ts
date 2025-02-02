// actions/myFriendsActions.ts
export const FETCH_MY_FRIENDS_REQUEST = "FETCH_MY_FRIENDS_REQUEST";
export const FETCH_MY_FRIENDS_SUCCESS = "FETCH_MY_FRIENDS_SUCCESS";
export const FETCH_MY_FRIENDS_FAILURE = "FETCH_MY_FRIENDS_FAILURE";

export const fetchMyFriendsRequest = () => {
  console.log("🔥 [ACTION] Dispatching FETCH_USERS_REQUEST");
  return { type: FETCH_MY_FRIENDS_REQUEST };
};

export const fetchMyFriendsSuccess = (users: any) => {
  console.log("✅ [ACTION] Dispatching FETCH_MY_FRIENDS_SUCCESS with users:", users);
  return { type: FETCH_MY_FRIENDS_SUCCESS, payload: users };
};

export const fetchMyFriendsFailure = (error: string) => {
  console.error("❌ [ACTION] Dispatching FETCH_MY_FRIENDS_FAILURE with error:", error);
  return { type: FETCH_MY_FRIENDS_FAILURE, payload: error };
};