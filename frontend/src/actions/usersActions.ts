// actions/userActions.ts
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const fetchUsersRequest = () => {
  console.log("🔥 [ACTION] Dispatching FETCH_USERS_REQUEST");
  return { type: FETCH_USERS_REQUEST };
};

export const fetchUsersSuccess = (users: any) => {
  console.log("✅ [ACTION] Dispatching FETCH_USERS_SUCCESS with users:", users);
  return { type: FETCH_USERS_SUCCESS, payload: users };
};

export const fetchUsersFailure = (error: string) => {
  console.error("❌ [ACTION] Dispatching FETCH_USERS_FAILURE with error:", error);
  return { type: FETCH_USERS_FAILURE, payload: error };
};