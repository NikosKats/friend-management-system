// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';


// Action Creators

// LOGIN_REQUEST action creator
export const loginRequest = (email: string, password: string) => {
  console.log("📤 Dispatched LOGIN_REQUEST with email:", email, "and password:", password);
  return {
    type: LOGIN_REQUEST,
    payload: { email, password },
  };
};

// LOGIN_SUCCESS action creator
export const loginSuccess = (data: { user: any, token: string }) => {
  console.log("🎉 Dispatched LOGIN_SUCCESS with user data and token:", data);
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

// Handle login success (store token and user in localStorage)
export const handleLoginSuccess = (token: string, user: any) => {
  console.log("🔐 Storing token and user in localStorage.", { token, user });
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return loginSuccess({ user, token });
};

// LOGIN_FAILURE action creator
export const loginFailure = (error: string) => {
  console.error("❌ Dispatched LOGIN_FAILURE with error:", error);
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

// LOGOUT_USER action creator
export const logoutUser = () => {
  console.log("🔒 Dispatched LOGOUT_USER. Logging out...");
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  return {
    type: LOGOUT_USER,
  };
};
