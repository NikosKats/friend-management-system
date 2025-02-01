// src/actions/userActions.ts

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUserRequest = (userId: string,) => {
  console.log(`🔥 [ACTION] Dispatching FETCH_USER_REQUEST from ${userId}`);
  return { type: FETCH_USER_REQUEST, payload: userId };
};

export const fetchUserSuccess = (user: any) => {
  console.log("✅ [ACTION] Dispatching FETCH_USER_SUCCESS with user:", user);
  return { type: FETCH_USER_SUCCESS, payload: user };
};

export const fetchUserFailure = (error: string) => {
  console.error("❌ [ACTION] Dispatching FETCH_USER_FAILURE with error:", error);
  return { type: FETCH_USER_FAILURE, payload: error };
};
